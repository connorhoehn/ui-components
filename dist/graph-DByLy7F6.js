import { t as e } from "./usePrefersReducedMotion-Cllucr7i.js";
import { t } from "./cn-DhjIN-s0.js";
import { _ as n } from "./overlayStack-CHdlnODN.js";
import { t as r } from "./Card-RQCeAPNU.js";
import { t as i } from "./IconButton-DDeXW3mZ.js";
import { f as a, l as o, t as s } from "./DropdownMenu-thsvyIAZ.js";
import { t as c } from "./Chip-zdVBwV9j.js";
import { t as l } from "./EmptyState-DFWbBBcY.js";
import { t as u } from "./Spinner-CLcq5z8N.js";
import { t as d } from "./SkeletonCard-CGe8XFPB.js";
import { n as f, t as p } from "./Tabs-DjNsAODd.js";
import { t as m } from "./Input-DLknWXri.js";
import { t as h } from "./Avatar-DeJWic2B.js";
import { t as g } from "./TitledFrame-D8PekrkI.js";
import { t as _ } from "./InlineAlert-CRnIKeAF.js";
import { n as v, t as y } from "./Tooltip-BI68huUY.js";
import { a as b, o as x, s as S } from "./backdropTone-BF54k8gW.js";
import { n as C, r as w, t as T } from "./RippleGridBackground-DTc7RHie.js";
import { t as E } from "./StatusPill-C-aN2Pzz.js";
import { t as D } from "./Select-D2EQq7Wi.js";
import { t as O } from "./Checkbox-Dftwml_V.js";
import { t as k } from "./formatBytes-05ivRSJY.js";
import { c as A, n as j, s as M } from "./useComputeProjects-BZyUWJy3.js";
import { n as N } from "./ChatSidePanelRegistry-Cfq-b6aZ.js";
/* empty css               */
import { t as P } from "./AnimatedEdge-OTHCEYJd.js";
import { Suspense as F, createContext as I, lazy as L, useCallback as R, useContext as z, useEffect as B, useId as V, useMemo as H, useRef as U, useState as W } from "react";
import { Fragment as G, jsx as K, jsxs as q } from "react/jsx-runtime";
import { Background as ee, BaseEdge as J, Controls as te, EdgeLabelRenderer as ne, Handle as Y, MarkerType as re, Position as X, ReactFlow as ie, getBezierPath as Z } from "@xyflow/react";
var ae = I({ right: 0 });
function oe() {
	return z(ae);
}
//#endregion
//#region src/components/graph/layout.ts
function se(e) {
	let t = e.find((e) => e.group === "center");
	if (t) return t;
	let n = null, r = !1;
	for (let t of e) typeof t.weight == "number" && (!n || t.weight > n.weight ? (n = t, r = !1) : t.weight === n.weight && (r = !0));
	return n && !r ? n : null;
}
function Q(e) {
	let t = [];
	for (let n of e) {
		let e = n.group ?? "";
		e !== "center" && (t.includes(e) || t.push(e));
	}
	return t;
}
function ce(e, t, n, r) {
	if (e.length === 0) return /* @__PURE__ */ new Map();
	switch (n) {
		case "grid": return ue(e, r);
		case "force": return de(e, t, r);
		default: return le(e, r);
	}
}
function le(e, { width: t, height: n, padding: r = 40 }) {
	let i = /* @__PURE__ */ new Map(), a = t / 2, o = n / 2, s = se(e), c = e.filter((e) => e !== s);
	if (s && i.set(s.id, {
		x: a,
		y: o
	}), c.length === 0) return i;
	let l = Q(c), u = /* @__PURE__ */ new Map();
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
				x: $(a + r * Math.cos(n)),
				y: $(o + r * Math.sin(n))
			});
		});
	}), i;
}
function ue(e, { width: t, height: n, padding: r = 40 }) {
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
				x: $(n),
				y: $(u)
			});
		});
	}), i;
}
function de(e, t, { width: n, height: r, padding: i = 40 }) {
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
			x: $(b + (s[t] - p) * y),
			y: $(x + (c[t] - h) * y)
		});
	}), S;
}
function $(e) {
	return Math.round(e * 100) / 100;
}
//#endregion
//#region src/components/graph/NodeGraph.tsx
var fe = 480, pe = [
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
], me = {
	fill: "fill-primary",
	bg: "bg-primary"
};
function he(e, t) {
	if (e === "center") return me;
	let n = t.indexOf(e ?? "");
	return pe[(n < 0 ? 0 : n) % pe.length];
}
var ge = .5, _e = 4, ve = {
	x: 0,
	y: 0,
	k: 1
};
function ye({ nodes: e, edges: n, layout: r = "radial", selectedId: a = null, onSelect: o, height: s = 320, className: c, "data-testid": l = "node-graph" }) {
	let u = H(() => ce(e, n, r, {
		width: 480,
		height: s
	}), [
		e,
		n,
		r,
		480,
		s
	]), d = H(() => Q(e), [e]), f = H(() => se(e), [e]), p = H(() => be(e, f), [e, f]), [m, h] = W(ve), [g, _] = W(null), v = U(null), y = U(null), [b, x] = W(!1), S = () => {
		let e = v.current?.getBoundingClientRect();
		return e && e.width > 0 ? 480 / e.width : 1;
	};
	B(() => {
		let e = v.current;
		if (!e) return;
		let t = (t) => {
			t.preventDefault();
			let n = e.getBoundingClientRect(), r = n.width > 0 ? 480 / n.width : 1, i = (t.clientX - n.left) * r, a = (t.clientY - n.top) * r;
			h((e) => {
				let n = Se(e.k * (t.deltaY < 0 ? 1.1 : 1 / 1.1), ge, _e), r = n / e.k;
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
	B(() => {
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
	let w = (e) => o?.(e), T = (e, t) => {
		(e.key === "Enter" || e.key === " ") && (e.preventDefault(), w(t));
	}, E = m.x === 0 && m.y === 0 && m.k === 1, D = H(() => new Map(e.map((e) => [e.id, e])), [e]);
	return /* @__PURE__ */ q("div", {
		className: t("relative flex flex-col overflow-hidden rounded-lg border border-border bg-surface", c),
		"data-testid": l,
		children: [
			/* @__PURE__ */ K("svg", {
				ref: v,
				role: "img",
				"aria-label": `Graph of ${e.length} nodes`,
				viewBox: `0 0 480 ${s}`,
				width: "100%",
				height: s,
				className: t("block select-none touch-none", b ? "cursor-grabbing" : "cursor-grab"),
				onMouseDown: C,
				"data-testid": `${l}-svg`,
				children: /* @__PURE__ */ q("g", {
					transform: `translate(${m.x} ${m.y}) scale(${m.k})`,
					"data-testid": `${l}-viewport`,
					children: [n.map((e, t) => {
						let n = u.get(e.from), r = u.get(e.to);
						if (!n || !r) return null;
						let i = a !== null && (e.from === a || e.to === a);
						return /* @__PURE__ */ q("g", {
							"data-testid": `${l}-edge-${e.from}-${e.to}`,
							children: [/* @__PURE__ */ K("line", {
								x1: n.x,
								y1: n.y,
								x2: r.x,
								y2: r.y,
								strokeWidth: xe(e.weight),
								className: i ? "stroke-primary" : "stroke-border-emphasis"
							}), e.label && /* @__PURE__ */ K("text", {
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
						let r = p.get(e.id) ?? 16, i = e.id === a, o = he(e.group, d), s = `${l}-clip-${e.id}`;
						return /* @__PURE__ */ q("g", {
							role: "button",
							tabIndex: 0,
							"aria-label": e.sublabel ? `${e.label}, ${e.sublabel}` : e.label,
							"aria-pressed": i,
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
							"data-selected": i || void 0,
							children: [
								/* @__PURE__ */ K("title", { children: e.sublabel ?? e.label }),
								(i || g === e.id) && /* @__PURE__ */ K("circle", {
									r: r + 4,
									className: t("fill-none", i ? "stroke-primary" : "stroke-border-emphasis"),
									strokeWidth: 2,
									strokeDasharray: i ? void 0 : "3 3"
								}),
								e.avatarUrl ? /* @__PURE__ */ q(G, { children: [
									/* @__PURE__ */ K("clipPath", {
										id: s,
										children: /* @__PURE__ */ K("circle", { r })
									}),
									/* @__PURE__ */ K("circle", {
										r,
										className: t("stroke-surface", o.fill),
										strokeWidth: 2
									}),
									/* @__PURE__ */ K("image", {
										href: e.avatarUrl,
										x: -r,
										y: -r,
										width: r * 2,
										height: r * 2,
										clipPath: `url(#${s})`,
										preserveAspectRatio: "xMidYMid slice"
									})
								] }) : /* @__PURE__ */ K("circle", {
									r,
									fill: e.color,
									className: t("stroke-surface", !e.color && o.fill),
									strokeWidth: 2
								}),
								!e.avatarUrl && /* @__PURE__ */ K("text", {
									y: 1,
									textAnchor: "middle",
									dominantBaseline: "middle",
									className: "pointer-events-none fill-white text-[10px] font-semibold",
									children: Ce(e.label)
								}),
								/* @__PURE__ */ K("text", {
									y: r + 12,
									textAnchor: "middle",
									className: "pointer-events-none fill-text-primary text-[11px]",
									children: e.label
								}),
								e === f && e.sublabel && /* @__PURE__ */ K("text", {
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
			/* @__PURE__ */ q("div", {
				className: "pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-2",
				children: [d.length > 0 && (d.length > 1 || d[0] !== "") ? /* @__PURE__ */ K("ul", {
					"aria-label": "Legend",
					className: "pointer-events-auto flex flex-wrap gap-x-3 gap-y-1 rounded-md bg-surface/85 px-2 py-1 text-[11px] text-text-secondary",
					"data-testid": `${l}-legend`,
					children: d.map((e) => /* @__PURE__ */ q("li", {
						className: "flex items-center gap-1",
						children: [/* @__PURE__ */ K("span", {
							"aria-hidden": !0,
							className: t("inline-block h-2 w-2 rounded-full", he(e, d).bg)
						}), e || "Other"]
					}, e || "(none)"))
				}) : /* @__PURE__ */ K("span", {}), /* @__PURE__ */ K(i, {
					size: "sm",
					"aria-label": "Reset view",
					title: "Reset view",
					disabled: E,
					onClick: () => h(ve),
					className: "pointer-events-auto bg-surface/85",
					"data-testid": `${l}-reset`,
					children: "⟲"
				})]
			}),
			a && D.get(a) && /* @__PURE__ */ q("span", {
				className: "sr-only",
				"aria-live": "polite",
				children: ["Selected ", D.get(a).label]
			})
		]
	});
}
function be(e, t) {
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
function xe(e) {
	return typeof e == "number" ? Se(1 + e * 1.5, 1, 5) : 1.5;
}
function Se(e, t, n) {
	return Math.min(n, Math.max(t, e));
}
function Ce(e) {
	let t = e.trim().split(/\s+/).filter(Boolean);
	return t.length === 0 ? "" : t.length === 1 ? t[0].slice(0, 2).toUpperCase() : (t[0][0] + t[t.length - 1][0]).toUpperCase();
}
//#endregion
//#region src/components/graph/PeopleGraph.tsx
var we = "__query__";
function Te(e, t) {
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
function Ee(e, t) {
	let n = [{
		id: we,
		label: t?.trim() || "Everyone",
		sublabel: `${e.length} ${e.length === 1 ? "person" : "people"}`,
		group: "center"
	}], r = [];
	for (let i of e) {
		let e = Te(i, t);
		n.push({
			id: i.id,
			label: i.name,
			sublabel: i.title,
			group: e,
			weight: i.score,
			avatarUrl: i.avatarUrl
		}), r.push({
			from: we,
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
function De({ people: e, query: i, onOpenPerson: a, onMessagePerson: o, graphHeight: s = 300, className: u, "data-testid": d = "people-graph" }) {
	let [f, p] = W(null), { nodes: m, edges: g } = H(() => Ee(e, i), [e, i]), _ = H(() => Q(m), [m]);
	return e.length === 0 ? /* @__PURE__ */ K(l, {
		size: "sm",
		icon: "🕸️",
		title: "No people found",
		body: i ? `Nothing matched “${i}”.` : "There is nobody to show yet.",
		testId: `${d}-empty`,
		className: u
	}) : /* @__PURE__ */ K("div", {
		className: t("@container flex min-h-0 flex-col gap-3 p-3", u),
		"data-testid": d,
		children: /* @__PURE__ */ q("div", {
			className: "flex min-h-0 flex-col gap-3 @lg:flex-row",
			children: [/* @__PURE__ */ K(ye, {
				nodes: m,
				edges: g,
				layout: "radial",
				height: s,
				selectedId: f,
				onSelect: (e) => p(e.id === "__query__" ? null : e.id),
				className: "@lg:flex-1",
				"data-testid": `${d}-graph`
			}), /* @__PURE__ */ K("ul", {
				className: "flex min-w-0 flex-col gap-2 @lg:w-[260px] @lg:shrink-0",
				"aria-label": "People",
				"data-testid": `${d}-list`,
				children: e.map((e) => {
					let s = Te(e, i), l = e.id === f;
					return /* @__PURE__ */ K("li", { children: /* @__PURE__ */ q(r, {
						padding: "none",
						className: t("flex cursor-pointer items-center gap-3 p-2", l && "ring-2 ring-primary"),
						onClick: () => p(l ? null : e.id),
						"data-testid": `${d}-row-${e.id}`,
						"data-selected": l || void 0,
						children: [
							/* @__PURE__ */ K("span", {
								className: t("h-2 w-2 shrink-0 rounded-full", he(s, _).bg),
								"aria-hidden": !0
							}),
							/* @__PURE__ */ K(h, {
								name: e.name,
								src: e.avatarUrl,
								size: 28
							}),
							/* @__PURE__ */ q("span", {
								className: "flex min-w-0 flex-1 flex-col",
								children: [
									/* @__PURE__ */ K("span", {
										className: "truncate text-[13px] font-medium text-text-primary",
										children: e.name
									}),
									e.title && /* @__PURE__ */ K("span", {
										className: "truncate text-[11px] text-text-tertiary",
										children: e.title
									}),
									s && /* @__PURE__ */ K("span", {
										className: "mt-0.5",
										children: /* @__PURE__ */ K(c, {
											size: "xs",
											children: s
										})
									})
								]
							}),
							/* @__PURE__ */ q("span", {
								className: "flex shrink-0 items-center gap-1",
								children: [o && /* @__PURE__ */ K(n, {
									size: "sm",
									variant: "secondary",
									onClick: (t) => {
										t.stopPropagation(), o(e.id);
									},
									"data-testid": `${d}-message-${e.id}`,
									children: "Message"
								}), a && /* @__PURE__ */ K(n, {
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
function Oe(e) {
	return Array.isArray(e.people);
}
function ke(e) {
	return (t, n) => /* @__PURE__ */ K(Ae, {
		panel: t,
		api: n,
		options: e
	});
}
function Ae({ panel: e, api: t, options: r }) {
	let { load: i, onOpenPerson: a, onMessagePerson: o, onSelectNode: s, graphHeight: c = 300, "data-testid": l = "graph-panel" } = r, [f, p] = W({ status: "loading" }), [m, h] = W(0), [g, v] = W(null);
	B(() => {
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
	let y = R(() => h((e) => e + 1), []), b = {
		panel: e,
		api: t
	};
	if (f.status === "loading") return /* @__PURE__ */ q("div", {
		className: "relative flex flex-col gap-3 p-3",
		"data-testid": `${l}-loading`,
		"aria-busy": "true",
		children: [
			/* @__PURE__ */ K(d, {
				height: c,
				rounded: "lg"
			}),
			/* @__PURE__ */ K(d, { height: 44 }),
			/* @__PURE__ */ K(d, { height: 44 }),
			/* @__PURE__ */ K("div", {
				className: "absolute inset-0 flex items-center justify-center",
				children: /* @__PURE__ */ K(u, {
					size: "md",
					"aria-label": "Loading graph"
				})
			})
		]
	});
	if (f.status === "error") return /* @__PURE__ */ q("div", {
		className: "flex flex-col gap-2 p-3",
		"data-testid": `${l}-error`,
		children: [/* @__PURE__ */ q(_, {
			tone: "error",
			children: ["Could not load this graph: ", f.message]
		}), /* @__PURE__ */ K(n, {
			size: "sm",
			variant: "secondary",
			onClick: y,
			className: "self-start",
			"data-testid": `${l}-retry`,
			children: "Try again"
		})]
	});
	let { data: x } = f;
	return Oe(x) ? /* @__PURE__ */ K(De, {
		people: x.people,
		query: x.query ?? e.params?.q ?? e.params?.query,
		graphHeight: c,
		onOpenPerson: a ? (e) => a(e, b) : void 0,
		onMessagePerson: o ? (e) => o(e, b) : void 0,
		"data-testid": `${l}-people`
	}) : /* @__PURE__ */ K("div", {
		className: "p-3",
		"data-testid": `${l}-nodes`,
		children: /* @__PURE__ */ K(ye, {
			nodes: x.nodes,
			edges: x.edges,
			layout: x.layout ?? "force",
			height: c,
			selectedId: g,
			onSelect: (e) => {
				v(e.id), s?.(e, b);
			},
			"data-testid": `${l}-graph`
		})
	});
}
//#endregion
//#region src/components/graph/work/WorkStatus.tsx
var je = {
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
function Me(e, t) {
	if (!(e !== "waiting" || !t)) return t.reason === "awaiting_approval" ? "Needs approval" : t.step ? `Paused at ${t.step}` : "Paused";
}
function Ne({ status: n, sharingFresh: r = !1, label: i, className: a }) {
	let o = e(), s = je[n], c = i ?? s.label, l = n === "running" && r && !o;
	return /* @__PURE__ */ q("span", {
		role: "status",
		"aria-label": i ? `${s.label}: ${i}` : s.label,
		"data-status": n,
		"data-sharing-fresh": r ? "true" : "false",
		className: t("inline-flex items-center gap-1.5 whitespace-nowrap text-xs font-medium", s.tone, a),
		children: [/* @__PURE__ */ K("span", {
			"aria-hidden": "true",
			className: t("inline-flex h-4 w-4 items-center justify-center rounded-full border border-current text-[10px] leading-none", l && "animate-pulse"),
			children: s.icon
		}), /* @__PURE__ */ K("span", { children: c })]
	});
}
//#endregion
//#region src/components/graph/work/WorkNode.tsx
var Pe = {
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
}, Fe = {
	terminal: "observe-terminal",
	document: "view-document",
	conversation: "join-conversation",
	meeting: "join-meeting",
	transcript: "view-transcript",
	run: "view-run"
}, Ie = {
	terminal: "Observe",
	document: "View",
	conversation: "Open chat",
	meeting: "Join",
	transcript: "View",
	run: "View"
};
function Le(e) {
	if (!e) return null;
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? null : t.toLocaleString(void 0, {
		dateStyle: "medium",
		timeStyle: "short"
	});
}
function Re(e) {
	return e.locked ? "Restricted work item" : e.title.trim() || `${Pe[e.kind]} (untitled)`;
}
function ze({ node: e, selected: r = !1, sharingFresh: i = !1, onSelect: a, onOpen: o }) {
	let s = Re(e), c = Fe[e.kind], l = c !== void 0 && e.capabilities.includes(c), u = Ie[e.kind] ?? "Open", d = Le(e.updatedAt), f = Le(e.startedAt), p = Le(e.endedAt), m = () => a?.(e.id);
	return /* @__PURE__ */ q("article", {
		role: "group",
		tabIndex: 0,
		"aria-label": `${Pe[e.kind]}: ${s}`,
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
			/* @__PURE__ */ q("div", {
				className: "flex min-w-0 items-start gap-2",
				children: [
					/* @__PURE__ */ K(h, {
						name: e.locked ? "Restricted work item" : s,
						...!e.locked && e.avatarUrl ? { src: e.avatarUrl } : {},
						size: 32
					}),
					/* @__PURE__ */ q("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ K("div", {
							className: "mb-1 text-[11px] font-medium uppercase tracking-wide text-text-tertiary",
							children: Pe[e.kind]
						}), /* @__PURE__ */ K("h3", {
							className: "break-words line-clamp-2 text-sm font-semibold text-text-primary",
							"data-testid": "work-node-title",
							children: s
						})]
					}),
					r && /* @__PURE__ */ K("span", {
						className: "sr-only",
						children: "Selected"
					})
				]
			}),
			e.kind === "conversation" && e.status === "completed" ? /* @__PURE__ */ K("span", {
				role: "status",
				className: "text-xs font-medium text-text-secondary",
				children: "Recent activity"
			}) : /* @__PURE__ */ K(Ne, {
				status: e.status,
				sharingFresh: i
			}),
			!e.locked && e.description && /* @__PURE__ */ K("p", {
				className: "break-words line-clamp-3 text-xs text-text-secondary",
				children: e.description
			}),
			/* @__PURE__ */ q("dl", {
				className: "grid min-w-0 gap-1 text-[11px] text-text-tertiary",
				children: [
					f && /* @__PURE__ */ q("div", { children: [/* @__PURE__ */ K("dt", {
						className: "inline font-medium",
						children: e.kind === "conversation" ? "First activity: " : "Started: "
					}), /* @__PURE__ */ K("dd", {
						className: "inline",
						children: f
					})] }),
					/* @__PURE__ */ q("div", { children: [/* @__PURE__ */ K("dt", {
						className: "inline font-medium",
						children: e.kind === "conversation" ? "Last activity: " : "Updated: "
					}), /* @__PURE__ */ K("dd", {
						className: "inline",
						children: d ?? "Unknown"
					})] }),
					p && /* @__PURE__ */ q("div", { children: [/* @__PURE__ */ K("dt", {
						className: "inline font-medium",
						children: "Ended: "
					}), /* @__PURE__ */ K("dd", {
						className: "inline",
						children: p
					})] })
				]
			}),
			l && c && /* @__PURE__ */ K(n, {
				size: "sm",
				variant: "secondary",
				disabled: !l || !o,
				"data-capability": c,
				"aria-label": `${u} ${Pe[e.kind].toLowerCase()}`,
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
var Be = {
	"works-on": "Works on",
	"runs-in": "Runs in",
	"operates-on": "Operates on",
	produced: "Produced",
	edited: "Edited",
	attended: "Attended",
	discussed: "Discussed",
	"derived-from": "Derived from"
};
function Ve({ edge: e, selected: n = !1, reducedMotion: r = !1, fromLabel: i, toLabel: a, onSelect: o }) {
	let s = Be[e.relation], c = e.disclosure === "existence", l = c ? "Shared connection" : e.label?.trim() || s;
	return /* @__PURE__ */ q("button", {
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
			/* @__PURE__ */ K("span", {
				"aria-hidden": "true",
				className: t("h-px min-w-4 flex-1 bg-border", n ? "bg-primary" : "group-hover:bg-primary/50")
			}),
			/* @__PURE__ */ q("span", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ K("span", {
					className: "block truncate text-xs font-medium text-text-primary",
					children: l
				}), /* @__PURE__ */ q("span", {
					className: "block truncate text-[11px] text-text-tertiary",
					children: [
						i,
						" → ",
						a
					]
				})]
			}),
			/* @__PURE__ */ K(Ne, { status: e.status }),
			/* @__PURE__ */ K("span", {
				"aria-hidden": "true",
				className: t("h-px min-w-4 flex-1 bg-border", n ? "bg-primary" : "group-hover:bg-primary/50")
			}),
			n && /* @__PURE__ */ K("span", {
				className: "sr-only",
				children: "Selected"
			})
		]
	});
}
//#endregion
//#region src/components/graph/work/WorkEntityList.tsx
function He(e, t, n) {
	return e?.kind === t && e.id === n;
}
function Ue(e) {
	return e.locked ? "Restricted work item" : e.title.trim() || "Untitled work item";
}
function We(e, t) {
	let n = t.get(e.fromId), r = t.get(e.toId), i = n ? Ue(n) : "Unavailable item", a = r ? Ue(r) : "Unavailable item";
	return e.label?.trim() || `${i} ${e.relation} ${a}`;
}
var Ge = (e) => t("w-full rounded-md border px-3 py-2 text-left text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50", e ? "border-primary bg-primary/10 ring-1 ring-primary" : "border-border hover:bg-surface-hover");
function Ke({ nodes: e, edges: t, selection: n, onSelectionChange: r, heading: i = "Accessible work graph", groups: a, footer: o, statusLabelOf: s }) {
	let c = new Map(e.map((e) => [e.id, e])), l = U(null), u = n ? `${n.kind}:${n.id}` : null;
	B(() => {
		u && l.current?.scrollIntoView?.({ block: "nearest" });
	}, [u]);
	let d = (e) => {
		let t = He(n, "node", e.id);
		return /* @__PURE__ */ K("li", { children: /* @__PURE__ */ q("button", {
			ref: t ? l : void 0,
			type: "button",
			"aria-label": `Work item: ${Ue(e)}`,
			"aria-pressed": t,
			"aria-current": t ? "true" : void 0,
			"data-selected": t || void 0,
			onClick: () => r({
				kind: "node",
				id: e.id
			}),
			className: Ge(t),
			children: [/* @__PURE__ */ K("span", {
				className: "block break-words font-medium text-text-primary",
				children: Ue(e)
			}), /* @__PURE__ */ K("span", {
				className: "text-xs text-text-tertiary",
				children: e.kind === "conversation" ? "Chat · Recent activity" : `${e.kind} · ${s?.(e) ?? e.status}`
			})]
		}) }, e.id);
	}, f = a?.map((e) => ({
		...e,
		items: e.nodeIds.map((e) => c.get(e)).filter((e) => !!e)
	})).filter((e) => e.items.length > 0), p = f ? f.length === 0 && t.length === 0 : e.length === 0 && t.length === 0;
	return /* @__PURE__ */ q("section", {
		"aria-labelledby": "work-entity-list-heading",
		className: "min-w-0 space-y-3",
		children: [
			/* @__PURE__ */ K("h3", {
				id: "work-entity-list-heading",
				className: "text-sm font-semibold text-text-primary",
				children: i
			}),
			p ? /* @__PURE__ */ K("p", {
				className: "text-sm text-text-secondary",
				children: "No shared work is available."
			}) : /* @__PURE__ */ q("div", {
				className: "grid gap-3 md:grid-cols-2",
				children: [/* @__PURE__ */ q("div", { children: [/* @__PURE__ */ K("h4", {
					className: "mb-1 text-xs font-medium uppercase tracking-wide text-text-tertiary",
					children: "Items"
				}), f ? f.map((e) => /* @__PURE__ */ q("section", {
					"aria-label": e.title,
					className: "mb-2",
					"data-testid": "work-entity-list-group",
					children: [/* @__PURE__ */ q("h5", {
						className: "mb-1 truncate text-xs font-semibold text-text-secondary",
						children: [e.title, e.subtitle && /* @__PURE__ */ q("span", {
							className: "font-normal text-text-tertiary",
							children: [" · ", e.subtitle]
						})]
					}), /* @__PURE__ */ K("ul", {
						className: "space-y-1",
						children: e.items.map(d)
					})]
				}, e.id)) : /* @__PURE__ */ K("ul", {
					className: "space-y-1",
					children: e.map(d)
				})] }), /* @__PURE__ */ q("div", { children: [/* @__PURE__ */ K("h4", {
					className: "mb-1 text-xs font-medium uppercase tracking-wide text-text-tertiary",
					children: "Relationships"
				}), /* @__PURE__ */ K("ul", {
					className: "space-y-1",
					children: t.map((e) => {
						let t = He(n, "edge", e.id), i = We(e, c);
						return /* @__PURE__ */ K("li", { children: /* @__PURE__ */ q("button", {
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
							className: Ge(t),
							children: [/* @__PURE__ */ K("span", {
								className: "block break-words font-medium text-text-primary",
								children: i
							}), /* @__PURE__ */ q("span", {
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
var qe = {
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
}, Je = /* @__PURE__ */ new Set([
	"view-document",
	"edit-document",
	"join-conversation",
	"join-meeting",
	"observe-terminal",
	"control-terminal",
	"view-transcript",
	"view-run"
]);
function Ye(e, t, n) {
	if (n) return n.kind === "node" ? e.find((e) => e.id === n.id) : t.find((e) => e.id === n.id);
}
function Xe(e) {
	return "kind" in e ? e.locked ? "Restricted work item" : e.title : e.label?.trim() || `${e.relation} relationship`;
}
function Ze({ nodes: e, edges: t, selection: r, onSelectionChange: i, onOpen: a, onReference: o, onRequestCollaboration: s }) {
	let c = Ye(e, t, r);
	if (B(() => {
		r && !c && i(null);
	}, [
		c,
		i,
		r
	]), !r || !c) return /* @__PURE__ */ K("aside", {
		"aria-label": "Work details",
		className: "rounded-lg border border-border bg-surface p-4",
		children: /* @__PURE__ */ K("p", {
			className: "text-sm text-text-secondary",
			children: "Select a work item or relationship to inspect it."
		})
	});
	let l = r, u = c.capabilities.find((e) => Je.has(e));
	return /* @__PURE__ */ q("aside", {
		"aria-label": "Work details",
		className: "space-y-4 rounded-lg border border-border bg-surface p-4",
		children: [
			/* @__PURE__ */ q("div", {
				className: "min-w-0",
				children: [
					/* @__PURE__ */ K("p", {
						className: "text-xs font-medium uppercase tracking-wide text-text-tertiary",
						children: "kind" in c ? c.kind : "Relationship"
					}),
					/* @__PURE__ */ K("h3", {
						className: "break-words text-base font-semibold text-text-primary",
						children: Xe(c)
					}),
					/* @__PURE__ */ K("p", {
						className: "text-sm text-text-secondary",
						children: c.status
					}),
					"description" in c && !c.locked && c.description ? /* @__PURE__ */ K("p", {
						className: "mt-2 break-words text-sm text-text-secondary",
						children: c.description
					}) : null
				]
			}),
			/* @__PURE__ */ q("div", {
				className: "flex flex-wrap gap-2",
				children: [u && a ? /* @__PURE__ */ K(n, {
					size: "sm",
					variant: "secondary",
					onClick: () => a(l),
					children: "Open"
				}) : null, o ? /* @__PURE__ */ K(n, {
					size: "sm",
					variant: "secondary",
					onClick: () => o(l),
					children: "Reference"
				}) : null]
			}),
			c.capabilities.length > 0 && s ? /* @__PURE__ */ q("div", { children: [/* @__PURE__ */ K("h4", {
				className: "mb-2 text-xs font-medium uppercase tracking-wide text-text-tertiary",
				children: "Request collaboration"
			}), /* @__PURE__ */ K("div", {
				className: "flex flex-wrap gap-2",
				children: c.capabilities.map((e) => /* @__PURE__ */ K(n, {
					size: "sm",
					variant: "secondary",
					onClick: () => s(l, e),
					children: qe[e]
				}, e))
			})] }) : null
		]
	});
}
//#endregion
//#region src/components/graph/work/WorkSharingControls.tsx
var Qe = [
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
function $e(e) {
	return e.locked ? "Restricted work item" : e.title.trim() || "Untitled work item";
}
function et(e) {
	return e.label?.trim() || `${e.relation} relationship`;
}
function tt(e, t, n, r) {
	let i = e[t];
	return {
		...e,
		[t]: r ? i.includes(n) ? i : [...i, n] : i.filter((e) => e !== n)
	};
}
function nt(e) {
	return e.audience.kind === "organization" ? ["Everyone in your organization"] : e.audience.kind === "people" ? e.audience.personIds : e.audience.conversationIds;
}
var rt = 8;
function it({ legend: e, empty: t, saving: n, idPrefix: r, items: i, selected: a, onToggle: o }) {
	let [s, c] = W(""), l = s.trim().toLowerCase(), u = l ? i.filter((e) => `${e.label} ${e.meta}`.toLowerCase().includes(l)) : i, d = i.filter((e) => a.includes(e.id)).length;
	return /* @__PURE__ */ q("fieldset", {
		disabled: n,
		className: "space-y-2",
		"data-testid": `work-sharing-${e.toLowerCase().replace(/\s+/g, "-")}`,
		children: [/* @__PURE__ */ q("legend", {
			className: "text-sm font-semibold text-text-primary",
			children: [e, i.length > 0 && /* @__PURE__ */ q("span", {
				className: "ml-2 text-xs font-normal text-text-tertiary",
				children: [
					d,
					" of ",
					i.length,
					" selected"
				]
			})]
		}), i.length === 0 ? /* @__PURE__ */ K("p", {
			className: "text-sm text-text-secondary",
			children: t
		}) : /* @__PURE__ */ q(G, { children: [i.length > rt && /* @__PURE__ */ K(m, {
			type: "search",
			value: s,
			placeholder: `Filter ${e.toLowerCase()}`,
			"aria-label": `Filter ${e.toLowerCase()}`,
			onChange: (e) => c(e.target.value)
		}), /* @__PURE__ */ q("div", {
			className: "max-h-72 space-y-2 overflow-y-auto pr-1",
			"data-testid": "work-sharing-checklist",
			children: [u.length === 0 && /* @__PURE__ */ K("p", {
				className: "text-sm text-text-secondary",
				children: "Nothing matches."
			}), u.map((e) => {
				let t = `${r}-${e.id}`;
				return /* @__PURE__ */ q("label", {
					htmlFor: t,
					className: "flex items-start gap-2 rounded-md border border-border px-3 py-2 text-sm text-text-primary",
					children: [/* @__PURE__ */ K(O, {
						id: t,
						checked: a.includes(e.id),
						disabled: n,
						onChange: (t) => o(e.id, t)
					}), /* @__PURE__ */ q("span", {
						className: "min-w-0 break-words",
						children: [/* @__PURE__ */ K("span", {
							className: "block font-medium",
							children: e.label
						}), /* @__PURE__ */ K("span", {
							className: "text-xs text-text-tertiary",
							children: e.meta
						})]
					})]
				}, e.id);
			})]
		})] })]
	});
}
function at({ state: e, value: t, availableNodes: r, availableEdges: i, saving: a = !1, error: o, conflict: s = !1, onChange: c, onStart: l, onPause: u, onResume: d, onStop: f }) {
	let p = V(), h = nt(t), g = e === "off" ? "Off" : e.charAt(0).toUpperCase() + e.slice(1);
	return /* @__PURE__ */ q("section", {
		"aria-labelledby": "work-sharing-heading",
		className: "space-y-5 rounded-lg border border-border bg-surface p-4",
		children: [
			/* @__PURE__ */ q("div", {
				className: "flex flex-wrap items-start justify-between gap-3",
				children: [/* @__PURE__ */ q("div", { children: [/* @__PURE__ */ K("h3", {
					id: "work-sharing-heading",
					className: "text-base font-semibold text-text-primary",
					children: "Share work activity"
				}), /* @__PURE__ */ K("p", {
					className: "mt-1 text-sm text-text-secondary",
					children: "Sharing is voluntary. Only the audience, work, relationships, and detail selected here are shared."
				})] }), /* @__PURE__ */ K("span", {
					className: "rounded-full border border-border bg-surface-inset px-2.5 py-1 text-xs font-medium text-text-secondary",
					children: g
				})]
			}),
			o ? /* @__PURE__ */ K(_, {
				tone: "error",
				children: o
			}) : null,
			s ? /* @__PURE__ */ K(_, {
				tone: "warning",
				children: "Sharing changed elsewhere. Review the current settings before trying again."
			}) : null,
			a ? /* @__PURE__ */ K("p", {
				role: "status",
				"aria-live": "polite",
				className: "text-sm text-text-secondary",
				children: "Saving sharing settings…"
			}) : null,
			/* @__PURE__ */ q("fieldset", {
				disabled: a,
				className: "space-y-2",
				children: [
					/* @__PURE__ */ K("legend", {
						className: "text-sm font-semibold text-text-primary",
						children: "Audience"
					}),
					/* @__PURE__ */ K("p", {
						className: "text-xs text-text-tertiary",
						children: t.audience.kind === "people" ? "Selected people" : t.audience.kind === "conversation" ? "Selected conversations" : "Organization"
					}),
					h.length > 0 ? /* @__PURE__ */ K("ul", {
						"aria-label": "Current sharing audience",
						className: "flex flex-wrap gap-2",
						children: h.map((e) => /* @__PURE__ */ K("li", {
							className: "max-w-full break-all rounded-md border border-border bg-surface-inset px-2 py-1 text-xs text-text-secondary",
							children: e
						}, e))
					}) : /* @__PURE__ */ K("p", {
						className: "text-sm text-text-secondary",
						children: "No audience selected."
					}),
					/* @__PURE__ */ K("p", {
						className: "text-xs text-text-tertiary",
						children: "Audience choices are provided by the host application."
					})
				]
			}),
			/* @__PURE__ */ K(it, {
				legend: "Work items",
				empty: "No work items are available.",
				saving: a,
				idPrefix: `${p}-node`,
				items: r.map((e) => ({
					id: e.id,
					label: $e(e),
					meta: e.kind
				})),
				selected: t.selectedNodeIds,
				onToggle: (e, n) => c(tt(t, "selectedNodeIds", e, n))
			}),
			/* @__PURE__ */ K(it, {
				legend: "Relationships",
				empty: "No relationships are available.",
				saving: a,
				idPrefix: `${p}-edge`,
				items: i.map((e) => ({
					id: e.id,
					label: et(e),
					meta: e.relation
				})),
				selected: t.selectedEdgeIds,
				onToggle: (e, n) => c(tt(t, "selectedEdgeIds", e, n))
			}),
			/* @__PURE__ */ q("div", {
				className: "grid gap-4 sm:grid-cols-2",
				children: [/* @__PURE__ */ q("label", {
					className: "space-y-1 text-sm font-medium text-text-primary",
					children: [/* @__PURE__ */ K("span", { children: "Detail shared" }), /* @__PURE__ */ K("select", {
						value: t.disclosure,
						disabled: a,
						onChange: (e) => c({
							...t,
							disclosure: e.target.value
						}),
						className: "h-9 w-full rounded-md border border-border-emphasis bg-surface-panel px-2.5 text-sm text-text-primary outline-none focus:border-info focus:ring-1 focus:ring-info/40 disabled:cursor-not-allowed disabled:opacity-50",
						children: Qe.map((e) => /* @__PURE__ */ K("option", {
							value: e.value,
							children: e.label
						}, e.value))
					})]
				}), /* @__PURE__ */ q("label", {
					className: "space-y-1 text-sm font-medium text-text-primary",
					children: [/* @__PURE__ */ K("span", { children: "Live sharing expires" }), /* @__PURE__ */ K(m, {
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
			/* @__PURE__ */ q("fieldset", {
				disabled: a,
				className: "space-y-3 rounded-md border border-border p-3",
				children: [
					/* @__PURE__ */ K("legend", {
						className: "px-1 text-sm font-semibold text-text-primary",
						children: "Earlier work"
					}),
					/* @__PURE__ */ q("label", {
						htmlFor: `${p}-history`,
						className: "flex items-start gap-2 text-sm text-text-primary",
						children: [/* @__PURE__ */ K(O, {
							id: `${p}-history`,
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
						}), /* @__PURE__ */ q("span", { children: [/* @__PURE__ */ K("span", {
							className: "block font-medium",
							children: "Share selected history"
						}), /* @__PURE__ */ K("span", {
							className: "block text-xs text-text-tertiary",
							children: "Historical work is never included unless you select this option."
						})] })]
					}),
					t.history ? /* @__PURE__ */ q("div", {
						className: "grid gap-3 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ q("label", {
								className: "space-y-1 text-sm font-medium text-text-primary",
								children: [/* @__PURE__ */ K("span", { children: "First day" }), /* @__PURE__ */ K(m, {
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
							/* @__PURE__ */ q("label", {
								className: "space-y-1 text-sm font-medium text-text-primary",
								children: [/* @__PURE__ */ K("span", { children: "Last day" }), /* @__PURE__ */ K(m, {
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
							/* @__PURE__ */ q("label", {
								className: "space-y-1 text-sm font-medium text-text-primary",
								children: [/* @__PURE__ */ K("span", { children: "History access expires" }), /* @__PURE__ */ K(m, {
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
			/* @__PURE__ */ q("div", {
				className: "flex flex-wrap gap-2",
				children: [
					e === "off" || e === "stopped" || e === "expired" ? /* @__PURE__ */ K(n, {
						disabled: a,
						onClick: l,
						children: e === "off" ? "Start sharing" : "Start sharing again"
					}) : null,
					e === "active" ? /* @__PURE__ */ K(n, {
						variant: "secondary",
						disabled: a,
						onClick: u,
						children: "Pause sharing"
					}) : null,
					e === "paused" ? /* @__PURE__ */ K(n, {
						disabled: a,
						onClick: d,
						children: "Resume sharing"
					}) : null,
					e === "active" || e === "paused" ? /* @__PURE__ */ K(n, {
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
var ot = /* @__PURE__ */ new Set([
	"view-document",
	"edit-document",
	"join-conversation",
	"join-meeting",
	"observe-terminal",
	"control-terminal",
	"view-transcript",
	"view-run"
]);
function st({ target: e, state: t, node: r, edge: i, unavailableLabel: a, onSelect: o, onOpen: s }) {
	let c = e?.kind === "node" ? r : e?.kind === "edge" ? i : void 0;
	if (t === "loading") return /* @__PURE__ */ K("article", {
		"aria-label": "Shared work reference",
		"aria-busy": "true",
		className: "rounded-lg border border-border bg-surface p-3",
		children: /* @__PURE__ */ K("p", {
			role: "status",
			className: "text-sm text-text-secondary",
			children: "Loading shared work…"
		})
	});
	if (t === "unavailable" || !e || !c) return /* @__PURE__ */ K("article", {
		"aria-label": "Shared work reference",
		className: "rounded-lg border border-border bg-surface p-3",
		children: /* @__PURE__ */ K("p", {
			className: "text-sm text-text-secondary",
			children: a ?? "This work item is unavailable."
		})
	});
	let l = e.kind === "node" ? r?.locked ? "Restricted work item" : r?.title : i?.label?.trim() || `${i?.relation ?? "Shared"} relationship`, u = (e.kind === "node" ? r?.capabilities ?? [] : i?.capabilities ?? []).some((e) => ot.has(e)), d = e;
	return /* @__PURE__ */ q("article", {
		"aria-label": "Shared work reference",
		className: "space-y-3 rounded-lg border border-border bg-surface p-3",
		children: [/* @__PURE__ */ q("button", {
			type: "button",
			"aria-label": `Select reference: ${l}`,
			disabled: !o,
			onClick: () => o?.(d),
			className: "block w-full rounded text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:cursor-default",
			children: [
				/* @__PURE__ */ K("span", {
					className: "block text-xs font-medium uppercase tracking-wide text-text-tertiary",
					children: e.kind === "node" ? r?.kind : "Relationship"
				}),
				/* @__PURE__ */ K("span", {
					className: "block break-words text-sm font-semibold text-text-primary",
					children: l
				}),
				/* @__PURE__ */ K("span", {
					className: "block text-xs text-text-secondary",
					children: c.status
				})
			]
		}), u && s ? /* @__PURE__ */ K(n, {
			size: "sm",
			variant: "secondary",
			onClick: () => s(d),
			children: "Open shared work"
		}) : null]
	});
}
//#endregion
//#region src/components/graph/work/WorkActivityTimeline.tsx
function ct(e, t) {
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
function lt(e, t, n, r, i) {
	let a = t.updatedAt || t.startedAt;
	if (!a) return null;
	let o = new Date(a);
	if (Number.isNaN(o.getTime())) return null;
	let s = ct(o, i);
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
function ut({ day: e, timezone: t, nodes: n, edges: r, selection: i, onSelectionChange: a }) {
	let [o, s] = W(() => /* @__PURE__ */ new Date());
	B(() => {
		let e = window.setInterval(() => s(/* @__PURE__ */ new Date()), 6e4);
		return () => window.clearInterval(e);
	}, []);
	let c = H(() => {
		let i = new Map(n.map((e) => [e.id, e.locked ? "Restricted work item" : e.title.trim() || "Untitled work item"]));
		return [...n.map((n) => lt("node", n, i.get(n.id), e, t)), ...r.map((n) => lt("edge", n, `${i.get(n.fromId) ?? "Work item"} → ${i.get(n.toId) ?? "Work item"}`, e, t))].filter((e) => e !== null).sort((e, t) => e.minute - t.minute || e.key.localeCompare(t.key));
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
	let u = ct(o, t), d = u.day === e;
	return /* @__PURE__ */ q("div", {
		className: "rounded-lg border border-border bg-surface px-4 py-3",
		"aria-label": `Activity on ${e}`,
		"data-testid": "work-activity-timeline",
		children: [
			/* @__PURE__ */ q("div", {
				className: "mb-3 flex items-baseline justify-between gap-3",
				children: [/* @__PURE__ */ q("div", { children: [/* @__PURE__ */ K("h2", {
					className: "text-sm font-semibold text-text-primary",
					children: "Activity over the day"
				}), /* @__PURE__ */ K("p", {
					className: "text-xs text-text-secondary",
					children: "Select a time to inspect visible work and its branches."
				})] }), /* @__PURE__ */ K("span", {
					className: "shrink-0 text-xs text-text-secondary",
					children: t
				})]
			}),
			/* @__PURE__ */ q("div", {
				className: "relative h-10 border-b border-border",
				children: [
					[
						0,
						6,
						12,
						18,
						24
					].map((e) => /* @__PURE__ */ K("span", {
						"aria-hidden": "true",
						className: "absolute bottom-0 h-2 border-l border-border",
						style: { left: `${e / 24 * 100}%` }
					}, e)),
					Array.from(l, ([e, t]) => {
						let n = t.some((e) => i?.kind === e.selection.kind && i.id === e.selection.id), r = t.some((e) => e.live);
						return /* @__PURE__ */ K("button", {
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
					d ? /* @__PURE__ */ K("span", {
						"aria-hidden": "true",
						className: "pointer-events-none absolute bottom-0 top-0 border-l-2 border-primary",
						style: { left: `${u.minute / 1440 * 100}%` }
					}) : null
				]
			}),
			/* @__PURE__ */ q("div", {
				className: "mt-1 flex justify-between text-[11px] text-text-secondary",
				"aria-hidden": "true",
				children: [
					/* @__PURE__ */ K("span", { children: "12 AM" }),
					/* @__PURE__ */ K("span", { children: "6 AM" }),
					/* @__PURE__ */ K("span", { children: "12 PM" }),
					/* @__PURE__ */ K("span", { children: "6 PM" }),
					/* @__PURE__ */ K("span", { children: "12 AM" })
				]
			}),
			/* @__PURE__ */ q("p", {
				className: "mt-2 text-xs text-text-secondary",
				children: [c.length === 0 ? "No visible activity recorded for this day." : `${c.length} visible work ${c.length === 1 ? "item" : "items"} across ${l.size} ${l.size === 1 ? "hour" : "hours"}.`, d ? ` Now ${u.time}.` : ""]
			}),
			c.length > 0 ? /* @__PURE__ */ q("details", {
				className: "mt-2 text-xs",
				children: [/* @__PURE__ */ K("summary", {
					className: "cursor-pointer text-primary",
					children: "Browse activity"
				}), /* @__PURE__ */ K("ol", {
					className: "mt-2 max-h-36 space-y-1 overflow-y-auto",
					children: c.map((e) => /* @__PURE__ */ K("li", { children: /* @__PURE__ */ q("button", {
						type: "button",
						className: `w-full rounded px-2 py-1 text-left hover:bg-surface-hover ${i?.kind === e.selection.kind && i.id === e.selection.id ? "font-semibold text-primary" : "text-text-primary"}`,
						onClick: () => a(e.selection),
						"aria-current": i?.kind === e.selection.kind && i.id === e.selection.id ? "true" : void 0,
						children: [
							/* @__PURE__ */ K("time", { children: e.time }),
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
var dt = .4, ft = .1, pt = dt, mt = .8, ht = 2, gt = 0, _t = (e, t, n) => JSON.stringify([
	e,
	t,
	n
]);
function vt(e) {
	if (!e) return 0;
	let t = Date.parse(e);
	return Number.isNaN(t) ? 0 : t;
}
function yt(e, t, n = {}) {
	let r = n.max ?? 2;
	if (!Number.isFinite(r) || r <= 0 || e.length <= r) return [...e];
	let i = new Map(t.map((e) => [e.id, Math.max(vt(e.updatedAt), vt(e.startedAt))])), a = e.map((e, t) => ({
		index: t,
		recency: Math.max(0, ...e.nodeIds.map((e) => i.get(e) ?? 0))
	})).sort((e, t) => t.recency - e.recency || e.index - t.index).slice(0, r), o = new Set(a.map((e) => e.index)), s = n.keepEffortId ? e.findIndex((e) => e.id === n.keepEffortId) : -1;
	return s >= 0 && !o.has(s) && (o.delete(a[a.length - 1].index), o.add(s)), e.filter((e, t) => o.has(t));
}
function bt(e, t, n, r) {
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
			id: _t(e.id, "node", t),
			entityId: t,
			x: U(E.get(t)),
			y: V[E.get(t)],
			...x(t)
		});
		for (let [t, n] of k) W.push({
			id: _t(e.id, "node", t),
			entityId: t,
			x: c,
			y: V[n],
			...x(t)
		});
		let G = T.length === 0, K = new Map(W.map((e) => [e.entityId, e])), q = /* @__PURE__ */ new Map();
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
			vertical: G,
			cyclicNodeIds: y,
			nodes: W,
			edges: m.map((t) => {
				let n = q.get(t.to) ?? 0;
				q.set(t.to, n + 1);
				let r = K.get(t.from), i = K.get(t.to), a = r.x !== i.x, o = a ? "out-right" : "out-bottom", s = a ? "in-left" : "in-top";
				return {
					id: _t(e.id, "edge", t.id),
					entityId: t.id,
					source: _t(e.id, "node", t.from),
					target: _t(e.id, "node", t.to),
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
		if (i.length) return bt(e, t, n, {
			...r,
			foldedForHeight: [...r.foldedForHeight ?? [], ...i.map((e) => e.id)]
		});
	}
	for (let [e, t] of p.entries()) t.x = _.places[e].x, t.y = _.places[e].y;
	return p;
}
//#endregion
//#region src/components/graph/work/WorkActivityNode.tsx
var xt = {
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
}, St = {
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
}, Ct = "flex items-center justify-center [&>*]:h-full [&>*]:w-full [&_img]:h-full [&_img]:w-full [&_img]:object-contain [&_svg]:h-full [&_svg]:w-full", wt = {
	idle: "bg-border-emphasis",
	running: "bg-info",
	waiting: "bg-caution",
	completed: "bg-success",
	error: "bg-danger",
	stopped: "bg-border-emphasis",
	stale: "bg-border-emphasis"
};
function Tt({ node: e, detail: n, selected: r, selectedRevisionId: a, live: s, onSelect: c, onFeedback: l }) {
	let u = e.locked || e.disclosure === "existence" ? void 0 : n, d = a ? u?.artifact?.revisions.find((e) => e.id === a) : u?.artifact?.revisions.at(-1), f = u?.artifact?.pending, p = e.locked ? "Restricted work item" : e.title, m = s && u?.fresh === !0, g = u?.emphasis === "earlier" || u?.emphasis === "input", _ = f?.status === "generating", v = !!u?.artifact?.revisions.length && e.status !== "running" && !_, y = St[e.kind], b = e.status === "error", x = u?.emphasis === "current" || !g && e.status === "running" && m, S = e.status === "running" && s && !m, C = Me(e.status, u?.pause), w = S ? "Running · updates delayed" : C ?? e.status, T = u?.lines?.length ? S ? [...u.lines, "Updates delayed"] : u.lines : [w], E = f?.status === "generating" ? `${f.label} generating` : f?.status === "failed" ? `${f.label} generation failed` : e.status === "running" && !m ? "running, updates delayed" : C ? `waiting, ${C}` : e.status, D = {
		kind: "node",
		id: e.id,
		...d ? { revisionId: d.id } : {}
	}, O = () => c(D);
	return /* @__PURE__ */ q("div", {
		className: "pointer-events-auto relative w-[200px]",
		"data-emphasis": u?.emphasis ?? "current",
		"data-work-node": e.id,
		onClick: O,
		children: [
			/* @__PURE__ */ q("article", {
				role: "button",
				tabIndex: 0,
				"aria-label": `${p}, ${E}`,
				"aria-pressed": r,
				"data-work-card": e.id,
				onKeyDown: (e) => {
					(e.key === "Enter" || e.key === " ") && (e.preventDefault(), O());
				},
				className: t("relative overflow-hidden rounded-lg border bg-surface text-left shadow-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary", b ? "border-danger" : x ? "border-info" : v ? "border-success" : "border-border", b || x || v ? "border-2" : "", v && "bg-success-bg/40", g && "opacity-80", r && "ring-2 ring-primary/30"),
				children: [
					/* @__PURE__ */ K("span", {
						"aria-hidden": "true",
						className: t("absolute inset-y-0 left-0 w-[3px]", b ? "bg-danger" : v ? "bg-success" : x ? "bg-info" : y.bar)
					}),
					/* @__PURE__ */ q("header", {
						className: "flex items-center gap-2 border-b border-border bg-surface-panel py-1.5 pl-3.5 pr-2.5",
						children: [
							/* @__PURE__ */ K("span", {
								"aria-hidden": "true",
								className: t("flex h-5 w-5 shrink-0 items-center justify-center rounded text-[11px] leading-none", y.chip),
								children: xt[e.kind]
							}),
							/* @__PURE__ */ K("span", {
								className: t("min-w-0 flex-1 truncate text-[12px] font-semibold", g ? "text-text-secondary" : "text-text-primary"),
								children: p
							}),
							/* @__PURE__ */ K("span", {
								"aria-hidden": "true",
								className: t("h-2 w-2 shrink-0 rounded-full", g ? "bg-border-emphasis" : wt[e.status])
							})
						]
					}),
					/* @__PURE__ */ q("div", {
						className: t("space-y-1.5 py-2 pl-3.5 pr-2.5 text-[11px] leading-snug", g ? "text-text-tertiary" : "text-text-secondary"),
						children: [
							T.map((n, r) => /* @__PURE__ */ q("div", {
								className: "flex items-start justify-between gap-1.5",
								children: [
									/* @__PURE__ */ K("span", {
										className: "min-w-0",
										children: n
									}),
									r === 0 && u?.badge && /* @__PURE__ */ K("span", {
										className: t("shrink-0 rounded px-1.5 py-px text-[10px] font-semibold", e.status === "running" ? "border border-info-border text-info-fg" : "bg-info-bg text-info-fg"),
										children: u.badge
									}),
									r === 0 && !u?.badge && C && n !== C && /* @__PURE__ */ K("span", {
										"data-testid": "work-card-pause",
										className: "shrink-0 rounded bg-warning-bg px-1.5 py-px text-[10px] font-semibold text-warning-fg",
										children: C
									})
								]
							}, `${r}-${n}`)),
							!!u?.participants?.length && /* @__PURE__ */ q("div", {
								className: "flex items-center gap-1.5",
								children: [/* @__PURE__ */ K("span", {
									className: "flex -space-x-1.5",
									children: u.participants.slice(0, 3).map((e) => /* @__PURE__ */ K(h, {
										name: e.label,
										src: e.avatarUrl,
										size: 18,
										className: "ring-1 ring-surface"
									}, e.id))
								}), /* @__PURE__ */ q("span", {
									className: "min-w-0 truncate text-[10px]",
									children: [u.participants.map((e) => e.label).slice(0, 2).join(", "), u.participants.length > 2 ? ` +${u.participants.length - 2}` : ""]
								})]
							}),
							u?.excerpt && /* @__PURE__ */ K("p", {
								className: t("text-[11px] italic", g ? "text-text-secondary" : "text-text-primary"),
								children: `“${u.excerpt}”`
							}),
							u?.attentionLabel && /* @__PURE__ */ K("p", {
								className: "font-medium text-text-primary",
								children: u.attentionLabel
							}),
							d?.preview && /* @__PURE__ */ K("div", {
								className: t("aspect-video w-full overflow-hidden rounded-lg border border-border bg-surface", "flex items-center justify-center [&>*]:h-full [&>*]:w-full [&_img]:h-full [&_img]:w-full [&_img]:object-contain [&_svg]:h-full [&_svg]:w-full"),
								"aria-label": `${p} ${d.label} preview`,
								children: d.preview
							}),
							!!u?.artifact?.revisions.length && /* @__PURE__ */ q("div", {
								className: "flex flex-wrap items-center gap-1 text-[10px]",
								"aria-label": `${p} revisions`,
								children: [u.artifact.revisions.map((e) => /* @__PURE__ */ K("span", {
									className: t("rounded px-1.5 py-0.5", e.id === d?.id ? "bg-info-bg font-medium text-info-fg" : "text-text-tertiary"),
									children: e.label
								}, e.id)), f?.status === "generating" && /* @__PURE__ */ q("span", {
									className: "rounded px-1.5 py-0.5 text-info-fg",
									children: [f.label, " generating"]
								})]
							}),
							f?.status === "failed" && !u?.lines?.length && /* @__PURE__ */ q("p", {
								className: "text-danger-fg",
								children: [f.label, " generation failed"]
							})
						]
					}),
					u?.footer && /* @__PURE__ */ q("div", {
						className: "flex items-center justify-between gap-2 border-t border-border py-1.5 pl-3.5 pr-2.5 text-[10px] text-text-tertiary",
						children: [/* @__PURE__ */ K("span", {
							className: "truncate",
							children: u.footer.label
						}), u.footer.note && /* @__PURE__ */ K("span", {
							className: "shrink-0",
							children: u.footer.note
						})]
					})
				]
			}),
			!!u?.tools?.length && /* @__PURE__ */ q("div", {
				className: "flex flex-wrap items-center gap-1.5 pl-1 pt-1 text-[10px] text-text-tertiary",
				children: [/* @__PURE__ */ K("span", { children: "Tools" }), u.tools.map((e) => /* @__PURE__ */ K("span", {
					className: "rounded bg-surface-panel px-1.5 py-0.5 font-semibold text-text-secondary",
					children: e
				}, e))]
			}),
			!!u?.feedbackCount && l && (!a || d) && /* @__PURE__ */ q(i, {
				size: "sm",
				className: "nodrag nopan absolute -right-2 -top-3 h-7 w-7 rounded-full border border-border bg-surface shadow-sm",
				"aria-label": `${u.feedbackCount} comments on ${p}`,
				onClick: (e) => {
					e.stopPropagation(), l(D);
				},
				children: [/* @__PURE__ */ K(o, { size: 14 }), /* @__PURE__ */ K("span", {
					className: "absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-0.5 text-[10px] text-white",
					children: u.feedbackCount
				})]
			})
		]
	});
}
//#endregion
//#region src/components/graph/work/WorkActivityCanvas.tsx
var Et = "!h-1.5 !w-1.5 !min-h-0 !min-w-0 !border-0 !bg-border-emphasis";
function Dt({ data: e, selected: t }) {
	return /* @__PURE__ */ q(G, { children: [
		/* @__PURE__ */ K(Y, {
			type: "target",
			id: "in-left",
			position: X.Left,
			isConnectable: !1,
			className: Et
		}),
		/* @__PURE__ */ K(Y, {
			type: "target",
			id: "in-top",
			position: X.Top,
			isConnectable: !1,
			className: Et
		}),
		/* @__PURE__ */ K(Tt, {
			node: e.entity,
			detail: e.detail,
			live: e.live,
			selected: !!t,
			selectedRevisionId: e.revisionId,
			onSelect: e.onSelect,
			onFeedback: e.onFeedback
		}),
		/* @__PURE__ */ K(Y, {
			type: "source",
			id: "out-right",
			position: X.Right,
			isConnectable: !1,
			className: Et
		}),
		/* @__PURE__ */ K(Y, {
			type: "source",
			id: "out-bottom",
			position: X.Bottom,
			isConnectable: !1,
			className: Et
		})
	] });
}
function Ot({ data: e }) {
	return /* @__PURE__ */ K(g, {
		tone: "surface",
		titleText: e.title,
		title: /* @__PURE__ */ q("span", {
			className: "flex min-w-0 max-w-full items-center gap-1.5 font-sans text-[11px] font-semibold text-text-secondary",
			children: [e.live && /* @__PURE__ */ K("span", {
				"aria-hidden": "true",
				className: "inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-primary/50"
			}), /* @__PURE__ */ K("span", {
				className: "truncate",
				"data-work-effort-title": "",
				children: e.title
			})]
		}),
		className: "pointer-events-none h-full w-full rounded-xl border-dashed border-border-subtle bg-surface/60",
		"data-testid": "work-effort",
		children: /* @__PURE__ */ q("div", {
			className: "flex min-w-0 items-center gap-2 px-4 pt-1 text-[10px] leading-4 text-text-tertiary",
			children: [/* @__PURE__ */ q("span", {
				className: "min-w-0 flex-1 truncate",
				title: e.subtitle,
				children: [e.subtitle, e.cycle && /* @__PURE__ */ K("span", {
					role: "status",
					className: "ml-2 text-warning-fg",
					children: "Relationship order unavailable"
				})]
			}), /* @__PURE__ */ q("span", {
				className: "pointer-events-auto flex shrink-0 items-center gap-2",
				children: [e.sources > 0 && /* @__PURE__ */ K(n, {
					size: "sm",
					variant: "link",
					className: "nodrag nopan text-[10px]",
					"aria-label": `${e.expanded ? "Hide" : "Show"} ${e.sources} sources for ${e.title}`,
					onClick: e.onSources,
					children: e.expanded ? "Hide sources" : `+ ${e.sources} sources`
				}), /* @__PURE__ */ K(n, {
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
function kt(e) {
	let n = e.data;
	return n ? /* @__PURE__ */ q(G, { children: [/* @__PURE__ */ K(P, {
		...e,
		data: { state: n.failed ? "traversed-failure" : n.active ? "active" : "default" }
	}), /* @__PURE__ */ K(ne, { children: /* @__PURE__ */ K("button", {
		type: "button",
		className: t("nodrag nopan pointer-events-auto absolute z-10 flex items-center justify-center rounded-full text-[10px] font-medium leading-none focus-visible:outline-2 focus-visible:outline-primary", n.pill ? t("h-5 max-w-28 border bg-surface px-2 shadow-sm", n.failed ? "border-danger text-danger-fg" : n.active ? "border-info text-info-fg" : "border-border-emphasis text-text-secondary") : "h-3 w-3 border border-transparent bg-transparent text-transparent focus-visible:border-border focus-visible:bg-surface"),
		style: { transform: `translate(-50%, -50%) translate(${n.labelX}px, ${n.labelY}px)` },
		onClick: n.onSelect,
		"aria-label": `${n.label}${n.failed ? ", failed" : n.active ? ", active" : ""}`,
		title: n.label,
		"data-work-edge-label": n.canonicalId,
		children: n.pill ? /* @__PURE__ */ K("span", {
			className: "truncate",
			children: n.pill
		}) : /* @__PURE__ */ K("span", {
			className: "sr-only",
			children: n.label
		})
	}) })] }) : null;
}
var At = {
	activity: Dt,
	effort: Ot
}, jt = { activity: kt };
function Mt(e) {
	let { activity: r, nodes: a, edges: o, selection: s, viewport: c, onViewportChange: l, onSelectionChange: u, background: d = "ripple-grid", onViewAsList: f, maxEfforts: p = 2 } = e, m = U(null), [h, g] = W({
		width: 640,
		height: 480
	}), [v, y] = W(/* @__PURE__ */ new Map()), x = U(null), S = U(void 0), E = U(r.view.focusedEffortId), { view: D, onViewChange: O } = r, k = oe().right;
	B(() => {
		let e = m.current;
		if (!e || typeof ResizeObserver > "u") return;
		let t = new ResizeObserver(([e]) => {
			let { width: t, height: n } = e.contentRect;
			t > 0 && n > 0 && g((e) => e.width === t && e.height === n ? e : {
				width: t,
				height: n
			});
		});
		return t.observe(e), () => t.disconnect();
	}, []);
	let A = [...Object.keys(r.edgeLabels ?? {}), ...r.failedEdgeIds ?? []].sort().join("\0"), j = s?.kind === "node" ? s.id : void 0, M = D.focusedEffortId ?? (j ? r.efforts.find((e) => e.nodeIds.includes(j))?.id ?? null : null), N = H(() => yt(r.efforts, a, {
		max: p,
		keepEffortId: M
	}), [
		r.efforts,
		a,
		p,
		M
	]), P = H(() => bt(a, o, N, {
		width: h.width,
		height: h.height,
		full: r.mode === "full",
		focusedEffortId: D.focusedEffortId,
		expandedSourceEfforts: D.expandedSourceEfforts,
		reversedEdgeIds: r.reversedEdgeIds,
		labelledEdgeIds: A.split("\0").filter(Boolean),
		measurements: v
	}), [
		a,
		o,
		N,
		r.mode,
		r.reversedEdgeIds,
		A,
		D.focusedEffortId,
		D.expandedSourceEfforts,
		h,
		v
	]), F = H(() => {
		let e = Math.min(0, ...P.map((e) => e.x)), t = Math.min(0, ...P.map((e) => e.y));
		return {
			left: e,
			top: t,
			width: Math.max(1, ...P.map((e) => e.x + e.width)) - e,
			height: Math.max(1, ...P.map((e) => e.y + e.height)) - t
		};
	}, [P]), I = R(() => {
		let { left: e, top: t, width: n, height: r } = F, i = Math.max(ft, Math.min(1.2, (h.width - 48) / n, (h.height - 48) / r));
		return {
			x: (h.width - n * i) / 2 - e * i,
			y: (h.height - r * i) / 2 - t * i,
			zoom: i
		};
	}, [F, h]), L = p !== 0, z = R(() => {
		let e = I();
		if (!L) return e;
		let { left: t, top: n, width: r } = F, i = Math.max(e.zoom, Math.min(mt, (h.width - 48) / r));
		return i <= e.zoom ? e : {
			x: (h.width - r * i) / 2 - t * i,
			y: 24 - n * i,
			zoom: i
		};
	}, [
		I,
		L,
		F,
		h
	]), V = H(() => {
		if (!j) return null;
		for (let e of P) {
			let t = e.nodes.find((e) => e.entityId === j);
			if (t) return {
				x: e.x + t.x,
				y: e.y + t.y,
				width: t.width,
				height: t.height
			};
		}
		return null;
	}, [P, j]), G = Math.max(1, h.width - k), J = R((e) => {
		if (!V) return e;
		let t = Math.max(e.zoom, Math.min(mt, (G - 48) / V.width));
		return {
			x: G / 2 - (V.x + V.width / 2) * t,
			y: h.height / 2 - (V.y + V.height / 2) * t,
			zoom: t
		};
	}, [
		V,
		h,
		G
	]), te = JSON.stringify([
		h,
		r.mode,
		D.focusedEffortId,
		D.expandedSourceEfforts,
		P.map((e) => [
			e.id,
			e.nodes.map((e) => e.id),
			e.edges.map((e) => e.id)
		]),
		P.every((e) => e.nodes.every((e) => v.has(e.entityId)))
	]);
	B(() => {
		if (x.current === te) return;
		let e = x.current === null;
		x.current = te;
		let t = E.current && !D.focusedEffortId && D.overviewViewport;
		if (E.current = D.focusedEffortId, t) {
			l(t);
			return;
		}
		e && D.canvasInitialized || (l(J(z())), S.current = j ? `${j}\u0000${k}` : void 0, D.canvasInitialized || O({
			...D,
			canvasInitialized: !0
		}));
	}, [
		te,
		z,
		J,
		D,
		O,
		l,
		j,
		k
	]), B(() => {
		if (!j) {
			S.current = void 0;
			return;
		}
		let e = `${j}\u0000${k}`;
		if (S.current === e || !V || x.current === null) return;
		S.current = e;
		let t = V.x * c.zoom + c.x, n = V.y * c.zoom + c.y;
		t >= 0 && n >= 0 && t + V.width * c.zoom <= G && n + V.height * c.zoom <= h.height || l(J(c));
	}, [
		j,
		V,
		c,
		h,
		G,
		k,
		J,
		l
	]);
	let ne = (e) => O({
		...D,
		focusedEffortId: D.focusedEffortId === e ? null : e,
		overviewViewport: D.focusedEffortId ? D.overviewViewport : c
	}), Y = new Map(a.map((e) => [e.id, e])), X = new Map(o.map((e) => [e.id, e])), Z = r.window.following, ae = new Set(Z ? r.activeEdgeIds : []), se = new Set(r.failedEdgeIds ?? []), Q = [], ce = [];
	for (let e of P) {
		let t = JSON.stringify(["effort", e.id]), n = D.expandedSourceEfforts.includes(e.id);
		Q.push({
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
				live: Z && e.nodes.some((e) => Y.get(e.entityId)?.status === "running"),
				sources: !D.focusedEffortId && (e.collapsedSourceCount > 0 || n) ? e.sourceCount : 0,
				expanded: n,
				focused: D.focusedEffortId === e.id,
				cycle: e.cyclicNodeIds.length > 0,
				onFocus: () => ne(e.id),
				onSources: () => O({
					...D,
					expandedSourceEfforts: n ? D.expandedSourceEfforts.filter((t) => t !== e.id) : [...D.expandedSourceEfforts, e.id]
				})
			}
		});
		for (let n of e.nodes) Q.push({
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
				entity: Y.get(n.entityId),
				detail: r.details?.[n.entityId],
				revisionId: s?.kind === "node" && s.id === n.entityId ? s.revisionId : void 0,
				live: Z,
				onSelect: u,
				onFeedback: r.onFeedback
			}
		});
		for (let t of e.edges) {
			let n = X.get(t.entityId), i = e.x + t.labelX, a = e.y + t.labelY, o = ae.has(n.id) && n.status === "running" && !n.endedAt, c = se.has(n.id), l = n.label || n.relation.replaceAll("-", " "), d = r.edgeLabels?.[n.id] ?? (c ? "failed" : void 0);
			ce.push({
				id: t.id,
				type: "activity",
				source: t.source,
				target: t.target,
				sourceHandle: t.sourceHandle,
				targetHandle: t.targetHandle,
				selected: s?.kind === "edge" && s.id === n.id,
				focusable: !1,
				markerEnd: {
					type: re.ArrowClosed,
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
	let le = new Map(Q.filter((e) => e.type === "activity").map((e) => [e.id, e.data.entity.id])), ue = Math.min(dt, c.zoom), de = (e) => l({
		...c,
		zoom: Math.max(ue, Math.min(2.5, c.zoom * e))
	}), $ = c.zoom < pt, fe = d === "ripple-grid", pe = b(m, "auto", fe);
	return /* @__PURE__ */ q("div", {
		ref: m,
		className: "relative isolate min-h-40 min-w-0 flex-1 overflow-hidden",
		"data-testid": "work-activity-canvas",
		"data-background": d,
		"data-backdrop-ink": fe ? pe === "night" ? "dark" : "light" : void 0,
		children: [
			fe && /* @__PURE__ */ K(w, {
				...pe === "night" ? C : T,
				className: "absolute inset-0 -z-10",
				"data-testid": "work-activity-ripple"
			}),
			/* @__PURE__ */ K(ie, {
				nodes: Q,
				edges: ce,
				nodeTypes: At,
				edgeTypes: jt,
				viewport: c,
				onViewportChange: l,
				onPaneClick: () => u(null),
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
					t.length && y((e) => {
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
				},
				children: !fe && /* @__PURE__ */ K(ee, {
					gap: 20,
					size: 1,
					color: "var(--color-border)"
				})
			}),
			$ && /* @__PURE__ */ q(_, {
				tone: "info",
				className: "absolute left-3 top-3 z-10 max-w-[min(26rem,calc(100%-1.5rem))] text-[11px]",
				"data-testid": "work-activity-zoom-hint",
				children: [/* @__PURE__ */ q("span", { children: ["The whole graph is in view, but too small to read.", f && " "] }), f && /* @__PURE__ */ K(n, {
					size: "sm",
					variant: "link",
					onClick: f,
					"data-testid": "work-activity-zoom-hint-list",
					children: "View as accessible list"
				})]
			}),
			/* @__PURE__ */ q("div", {
				className: "absolute z-10 bottom-3 left-3 flex items-center gap-1 rounded-md border border-border bg-surface p-1",
				"data-testid": "work-activity-controls",
				children: [
					/* @__PURE__ */ K(i, {
						size: "sm",
						"aria-label": "Zoom in",
						onClick: () => de(1.2),
						children: "+"
					}),
					/* @__PURE__ */ K(i, {
						size: "sm",
						"aria-label": "Zoom out",
						onClick: () => de(1 / 1.2),
						children: "−"
					}),
					/* @__PURE__ */ K(n, {
						size: "sm",
						variant: "secondary",
						onClick: () => l(I()),
						children: "Fit graph"
					})
				]
			}),
			/* @__PURE__ */ K("ul", {
				"aria-label": "Activity emphasis legend",
				style: k ? {
					right: k + 16,
					...G < 440 ? { bottom: 60 } : {}
				} : void 0,
				className: "pointer-events-none absolute bottom-4 right-4 z-10 flex items-center gap-2 rounded border border-border bg-surface px-2 py-1 text-[10px] text-text-tertiary",
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
						Z ? "Active" : "Active then",
						"border-info bg-info"
					]
				].map(([e, n, r]) => /* @__PURE__ */ q("li", {
					className: "flex items-center gap-1",
					children: [/* @__PURE__ */ K("span", {
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
var Nt = [{
	id: "activity",
	label: "Activity"
}, {
	id: "lab",
	label: "Computer Lab"
}], Pt = [
	1,
	2,
	3,
	5
], Ft = "all";
function It({ title: e, subtitle: n, expanded: r = !1, onExpand: o, onPopOut: s, onClose: c, actions: l, view: u = "activity", onViewChange: d, viewNote: p, effortCount: m = 0, maxEfforts: h, onMaxEffortsChange: g, className: _, "data-testid": v = "work-activity-header" }) {
	let b = !!g && m > 1, x = h ?? 0, S = Number.isFinite(x) && x > 0 && x < m, C = [...[.../* @__PURE__ */ new Set([...Pt, ...S ? [x] : []])].filter((e) => e < m).sort((e, t) => e - t).map((e) => ({
		value: String(e),
		label: `Show ${e} of ${m} activities`
	})), {
		value: Ft,
		label: `All ${m} activities`
	}], w = /* @__PURE__ */ q("header", {
		"data-testid": v,
		className: t("flex shrink-0 items-center justify-between gap-2 border-b border-border bg-surface px-3 py-1.5", _),
		children: [/* @__PURE__ */ q("span", {
			className: "flex min-w-0 flex-col",
			children: [/* @__PURE__ */ K("span", {
				className: "truncate text-[12px] font-semibold text-text-secondary",
				"data-testid": `${v}-title`,
				children: e
			}), n && /* @__PURE__ */ K("span", {
				className: "truncate text-[11px] text-text-tertiary",
				"data-testid": `${v}-subtitle`,
				children: n
			})]
		}), /* @__PURE__ */ q("span", {
			className: "flex shrink-0 items-center gap-1",
			children: [
				l,
				o && /* @__PURE__ */ K(y, {
					content: r ? "Show chat" : "Expand activity",
					placement: "bottom",
					children: /* @__PURE__ */ K(i, {
						size: "md",
						"aria-label": r ? "Show chat" : "Expand activity",
						"aria-pressed": r,
						onClick: o,
						"data-testid": `${v}-expand`,
						children: /* @__PURE__ */ K("svg", {
							width: "16",
							height: "16",
							viewBox: "0 0 16 16",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "1.5",
							strokeLinecap: "round",
							strokeLinejoin: "round",
							"aria-hidden": "true",
							children: r ? /* @__PURE__ */ q(G, { children: [/* @__PURE__ */ K("rect", {
								x: "2",
								y: "2.5",
								width: "12",
								height: "11",
								rx: "1.5"
							}), /* @__PURE__ */ K("path", { d: "M6 2.5v11" })] }) : /* @__PURE__ */ K("path", { d: "M6 2H2v4M10 2h4v4M14 10v4h-4M6 14H2v-4" })
						})
					})
				}),
				s && /* @__PURE__ */ K(y, {
					content: "Open activity in its own page",
					placement: "bottom",
					children: /* @__PURE__ */ K(i, {
						size: "md",
						"aria-label": "Open activity in its own page",
						onClick: s,
						"data-testid": `${v}-pop-out`,
						children: /* @__PURE__ */ K("svg", {
							width: "16",
							height: "16",
							viewBox: "0 0 16 16",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "1.5",
							strokeLinecap: "round",
							strokeLinejoin: "round",
							"aria-hidden": "true",
							children: /* @__PURE__ */ K("path", { d: "M9 2h5v5M14 2 7 9M6 3H3a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-3" })
						})
					})
				}),
				c && /* @__PURE__ */ K(y, {
					content: "Close activity",
					placement: "bottom",
					children: /* @__PURE__ */ K(i, {
						size: "md",
						"aria-label": "Close activity",
						onClick: c,
						"data-testid": `${v}-close`,
						children: /* @__PURE__ */ K(a, {})
					})
				})
			]
		})]
	});
	return !d && !b ? w : /* @__PURE__ */ q("div", {
		className: "flex shrink-0 flex-col",
		children: [w, /* @__PURE__ */ q("div", {
			"data-testid": `${v}-views`,
			className: "@container flex shrink-0 items-center gap-2.5 border-b border-border bg-surface px-3 py-1.5",
			children: [
				d && /* @__PURE__ */ K(f, {
					items: Nt,
					value: u,
					onValueChange: (e) => d(e),
					variant: "segmented",
					size: "sm",
					"aria-label": "Side panel content",
					idPrefix: `${v}-view`
				}),
				b && /* @__PURE__ */ K(D, {
					size: "sm",
					variant: "pill",
					className: "max-w-52 truncate normal-case",
					"aria-label": "Activities shown",
					"data-testid": `${v}-max-efforts`,
					options: C,
					value: S ? String(x) : Ft,
					onChange: (e) => g(e.target.value === Ft ? 0 : Number(e.target.value))
				}),
				p && /* @__PURE__ */ K("span", {
					className: "hidden min-w-0 truncate text-[11px] text-text-tertiary @lg:inline",
					"data-testid": `${v}-view-note`,
					children: p
				})
			]
		})]
	});
}
//#endregion
//#region src/components/graph/work/WorkArtifactInspector.tsx
function Lt(e, t) {
	let n = t.revisionId ? e.revisions.find((e) => e.id === t.revisionId) : e.revisions.at(-1), r = n?.slides ?? [];
	return {
		revision: n,
		slides: r,
		slide: r.find((e) => e.id === t.anchorId) ?? r.find((e) => e.id === n?.anchorId) ?? r[0]
	};
}
function Rt({ node: e, artifact: r, selection: a, onSelectionChange: o, onOpen: s, onReference: c, quiet: l = !1 }) {
	let u = V(), { revision: d, slides: m, slide: h } = Lt(r, a), g = h ? m.indexOf(h) : -1, _ = {
		...a,
		revisionId: d?.id,
		anchorId: h?.id ?? d?.anchorId
	}, v = e.capabilities.includes("view-document") || e.capabilities.includes("edit-document"), y = r.pending, b = (t) => o({
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
	return /* @__PURE__ */ q("div", {
		className: "space-y-3",
		children: [
			r.revisions.length > 0 && /* @__PURE__ */ q("section", {
				className: "space-y-1.5",
				children: [/* @__PURE__ */ K("h3", {
					className: "text-[10px] font-semibold uppercase tracking-wide text-text-tertiary",
					children: "Revisions"
				}), /* @__PURE__ */ K(f, {
					idPrefix: u,
					"aria-label": "Available revisions",
					variant: "segmented",
					size: "sm",
					className: "w-full [&>button]:flex-1",
					items: x,
					value: d?.id ?? "",
					onValueChange: (t) => {
						t !== y?.id && o({
							kind: "node",
							id: e.id,
							revisionId: t
						});
					}
				})]
			}),
			y?.status === "generating" && !l && /* @__PURE__ */ q("p", {
				role: "status",
				className: "text-xs text-text-secondary",
				children: [
					y.label,
					" is generating. You can review available revisions.",
					y.message ? ` ${y.message}` : ""
				]
			}),
			y?.status === "failed" && !l && /* @__PURE__ */ q("p", {
				role: "status",
				className: "text-xs text-danger-fg",
				children: [
					y.label,
					" could not be generated.",
					y.message ? ` ${y.message}` : ""
				]
			}),
			d ? /* @__PURE__ */ q(p, {
				idPrefix: u,
				id: d.id,
				when: d.id,
				className: "space-y-2",
				children: [
					/* @__PURE__ */ K("div", {
						"aria-label": `${d.label} preview`,
						className: t("aspect-video overflow-hidden rounded-lg border border-border bg-surface", Ct),
						children: h?.preview ?? d.preview ?? /* @__PURE__ */ K("span", {
							className: "flex h-full items-center justify-center text-sm text-text-secondary",
							children: "Preview unavailable"
						})
					}),
					m.length > 0 && h && /* @__PURE__ */ q("div", {
						className: "flex items-center gap-1",
						children: [
							/* @__PURE__ */ K(i, {
								size: "sm",
								"aria-label": "Previous slide",
								disabled: g <= 0,
								onClick: () => b(m[g - 1].id),
								children: "‹"
							}),
							/* @__PURE__ */ q("span", {
								className: "flex-1 text-center text-xs text-text-secondary",
								children: [
									"Slide ",
									h.index,
									" of ",
									m.length
								]
							}),
							/* @__PURE__ */ K(i, {
								size: "sm",
								"aria-label": "Next slide",
								disabled: g >= m.length - 1,
								onClick: () => b(m[g + 1].id),
								children: "›"
							}),
							/* @__PURE__ */ K(D, {
								size: "sm",
								"aria-label": "Slide",
								className: "w-32",
								value: h.id,
								options: m.map((e) => ({
									value: e.id,
									label: `${e.index}. ${e.title}`
								})),
								onChange: (e) => b(e.target.value)
							})
						]
					}),
					r.onOpenPreview && /* @__PURE__ */ K(n, {
						size: "sm",
						variant: "secondary",
						fullWidth: !0,
						onClick: () => r.onOpenPreview(d.id, h?.id ?? d.anchorId),
						children: "Open larger preview"
					}),
					!h && /* @__PURE__ */ K("p", {
						className: "text-xs text-text-secondary",
						children: d.anchorLabel ?? d.label
					})
				]
			}) : /* @__PURE__ */ K("p", {
				className: "text-sm text-text-secondary",
				children: a.revisionId ? "The selected revision is unavailable." : "No revision is available yet."
			}),
			/* @__PURE__ */ q("div", {
				className: "flex flex-wrap gap-2",
				children: [v && s && d && /* @__PURE__ */ K(n, {
					size: "sm",
					variant: "secondary",
					onClick: () => s(_),
					children: "Open presentation"
				}), c && d && /* @__PURE__ */ K(n, {
					size: "sm",
					variant: "secondary",
					onClick: () => c(_),
					children: "Reference in chat"
				})]
			})
		]
	});
}
//#endregion
//#region src/components/graph/work/WorkComputePane.tsx
var zt = L(() => import("./ChatLabTerminal-Bo1W-3OK.js")), Bt = {
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
}, Vt = {
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
}, Ht = {
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
}, Ut = {
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
function Wt(e) {
	let t = 2166136261;
	for (let n = 0; n < e.length; n += 1) t ^= e.charCodeAt(n), t = Math.imul(t, 16777619);
	return t >>> 0;
}
function Gt(e) {
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : t.toLocaleTimeString([], { hour12: !1 });
}
function Kt(e) {
	if (e == null || !Number.isFinite(e) || e < 0) return "";
	let t = Math.round(e / 1e3);
	if (t < 60) return `${t}s`;
	let n = Math.floor(t / 60);
	return n < 60 ? t % 60 ? `${n}m ${t % 60}s` : `${n}m` : `${Math.floor(n / 60)}h ${String(n % 60).padStart(2, "0")}m`;
}
function qt(e) {
	let t = Vt[e.status].word, n = Kt(e.elapsedMs);
	return n ? e.status === "running" ? `${t} · ${n} elapsed` : `${t} · ${n}` : t;
}
function Jt(e) {
	let { metrics: t, task: n } = e, r = t.contextBudgetTokens;
	return {
		id: e.label,
		label: e.label,
		sessionId: e.shell?.sessionId ?? "",
		createdAt: n.startedAt ?? "",
		status: Bt[e.status].box,
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
function Yt({ label: e, value: t, title: n }) {
	return /* @__PURE__ */ q("div", {
		className: "min-w-0 rounded-md border border-border bg-surface-inset px-2 py-1.5",
		children: [/* @__PURE__ */ K("span", {
			className: "block text-[10px] font-semibold uppercase tracking-wide text-text-tertiary",
			children: e
		}), /* @__PURE__ */ K("span", {
			className: "block truncate font-mono text-[12px] text-text-primary",
			title: n,
			children: t
		})]
	});
}
function Xt({ label: e, trailing: t, children: n }) {
	return /* @__PURE__ */ q("section", {
		className: "space-y-1.5 rounded-md border border-border p-2.5",
		children: [/* @__PURE__ */ q("h4", {
			className: "flex items-baseline gap-2 text-[10px] font-semibold uppercase tracking-wide text-text-tertiary",
			children: [/* @__PURE__ */ K("span", {
				className: "min-w-0 truncate",
				children: e
			}), t && /* @__PURE__ */ K("span", {
				className: "ml-auto shrink-0 normal-case tracking-normal text-text-tertiary",
				children: t
			})]
		}), n]
	});
}
function Zt({ lines: e, running: n, label: r, environment: i, seed: a, testId: o }) {
	return /* @__PURE__ */ q("div", {
		"data-testid": o,
		className: "overflow-hidden rounded-md border border-code-border bg-code-bg font-mono text-[11px] leading-relaxed",
		children: [/* @__PURE__ */ q("div", {
			className: t("flex items-center gap-2 border-b border-code-border px-2 py-1", n ? "bg-transparent" : "bg-code-panel"),
			children: [
				/* @__PURE__ */ K("span", {
					"aria-hidden": "true",
					className: "text-code-green",
					children: "$"
				}),
				/* @__PURE__ */ K("span", {
					className: "min-w-0 truncate text-code-text",
					children: r
				}),
				/* @__PURE__ */ K("span", {
					className: "ml-auto shrink-0 text-code-blue",
					children: i
				})
			]
		}), /* @__PURE__ */ q(S, {
			active: n,
			particleCount: 90,
			speed: .1,
			alphaParticles: !0,
			particleColors: x,
			fallbackIntensity: "low",
			seed: a,
			className: "space-y-0.5 px-2 py-1.5",
			"data-testid": `${o}-particles`,
			children: [
				e.map((e, n) => {
					let r = Ht[e.glyph] ?? Ht.text;
					return /* @__PURE__ */ q("p", {
						className: "flex gap-1.5",
						children: [/* @__PURE__ */ K("span", {
							"aria-hidden": "true",
							className: t("shrink-0", r.text),
							children: r.glyph
						}), /* @__PURE__ */ K("span", {
							className: "min-w-0 whitespace-pre-wrap break-words text-code-subtle",
							children: e.text
						})]
					}, `${n}-${e.text}`);
				}),
				!e.length && /* @__PURE__ */ K("p", {
					className: "text-code-muted",
					children: "No output yet."
				}),
				n && /* @__PURE__ */ K("p", {
					"aria-hidden": "true",
					className: "text-code-green",
					children: /* @__PURE__ */ K("span", {
						className: "inline-block animate-pulse motion-reduce:animate-none",
						children: "▌"
					})
				})
			]
		})]
	});
}
function Qt({ compute: e, banner: r, className: i, "data-testid": a = "work-compute-pane" }) {
	let [o, l] = W("activity"), [u, d] = W([]), m = Bt[e.status] ?? Bt.running, { metrics: g, task: _ } = e, y = e.runtime === "agentcore-microvm" ? "AgentCore microVM" : "Local runtime", b = H(() => Jt(e), [e]), C = H(() => Wt(e.shell?.sessionId ?? e.label), [e.shell?.sessionId, e.label]), w = g.contextBudgetTokens, T = w ? `${Math.round(g.contextTokens / w * 100)}% (${j(w)})` : j(g.contextTokens), D = H(() => e.events.map((e) => {
		let n = u.includes(e.id), r = Ut[e.kind] ?? Ut.text;
		return {
			id: e.id,
			timestamp: Gt(e.at),
			...e.kind === "error" ? { level: "error" } : {},
			message: /* @__PURE__ */ q("span", {
				className: "flex flex-wrap items-baseline gap-1.5",
				children: [
					/* @__PURE__ */ K("span", {
						"aria-hidden": "true",
						className: t("shrink-0", r.text),
						children: r.glyph
					}),
					/* @__PURE__ */ K("span", {
						className: t("whitespace-pre-wrap break-words", r.text),
						children: e.text
					}),
					e.mock && /* @__PURE__ */ K(c, {
						size: "xs",
						mono: !0,
						uppercase: !0,
						palette: "code",
						tone: "caution",
						title: "Produced by a mock runtime, not a real box",
						children: "mock"
					}),
					e.detail && /* @__PURE__ */ K("button", {
						type: "button",
						"aria-expanded": n,
						onClick: () => d((t) => t.includes(e.id) ? t.filter((t) => t !== e.id) : [...t, e.id]),
						className: "cursor-pointer border-none bg-transparent p-0 text-[10px] uppercase tracking-wide text-code-muted hover:text-code-text",
						children: n ? "− hide" : "+ detail"
					}),
					e.detail && n && /* @__PURE__ */ K("span", {
						className: "mt-1 block w-full whitespace-pre-wrap break-words rounded border border-code-border bg-code-bg px-2 py-1 text-[11px] text-code-subtle",
						children: e.detail
					})
				]
			})
		};
	}), [e.events, u]), O = r ?? {
		tone: m.tone,
		title: _.title,
		description: [
			e.label,
			y,
			_.startedAt ? `started ${_.startedAt}` : null,
			e.shared ? "Shared with you" : "Yours"
		].filter(Boolean).join(" · ")
	}, N = O.tone === "error" ? {
		card: "border-danger-border bg-danger-bg",
		dot: "bg-danger",
		title: "text-danger-fg"
	} : O.tone === "success" ? {
		card: "border-success-border bg-success-bg",
		dot: "bg-success",
		title: "text-success-fg"
	} : {
		card: "border-info-border bg-info-bg",
		dot: "bg-info",
		title: "text-info-fg"
	}, P = () => {
		l("shell"), e.onOpenShell?.();
	}, I = [
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
	], L = o === "shell" && !e.shell ? "activity" : o;
	return /* @__PURE__ */ q("div", {
		"data-testid": a,
		"data-status": e.status,
		className: t("space-y-3", i),
		children: [
			/* @__PURE__ */ q("div", {
				role: "status",
				"data-testid": `${a}-card`,
				"data-tone": O.tone,
				className: t("flex gap-2 rounded-md border p-2.5", N.card),
				children: [/* @__PURE__ */ K("span", {
					"aria-hidden": "true",
					className: t("mt-1.5 h-2 w-2 shrink-0 rounded-full", N.dot, m.busy && "animate-pulse motion-reduce:animate-none")
				}), /* @__PURE__ */ q("span", {
					className: "min-w-0",
					children: [
						/* @__PURE__ */ K("span", {
							className: t("block text-[13px] font-semibold", N.title),
							children: O.title
						}),
						O.description && /* @__PURE__ */ K("span", {
							className: "block text-xs text-text-secondary",
							children: O.description
						}),
						_.description && /* @__PURE__ */ K("span", {
							className: "mt-1 block text-xs text-text-secondary",
							children: _.description
						})
					]
				})]
			}),
			e.notice && /* @__PURE__ */ K("p", {
				role: "status",
				"data-testid": `${a}-notice`,
				className: "rounded-md border border-warning-border bg-warning-bg px-2 py-1 text-[11px] text-warning-fg",
				children: e.notice
			}),
			/* @__PURE__ */ q("div", {
				className: "flex items-center gap-2",
				"data-testid": `${a}-owner`,
				children: [
					/* @__PURE__ */ K(h, {
						name: e.owner.name,
						size: 22,
						...e.owner.avatarUrl ? { src: e.owner.avatarUrl } : {}
					}),
					/* @__PURE__ */ q("span", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ K("span", {
							className: "block truncate text-[13px] text-text-primary",
							children: e.owner.name
						}), /* @__PURE__ */ K("span", {
							className: "block truncate text-[11px] text-text-tertiary",
							children: e.shared ? "Shared with you" : "Yours"
						})]
					}),
					/* @__PURE__ */ K(E, {
						state: m.pill,
						label: m.label,
						size: "sm",
						"data-testid": `${a}-status`
					})
				]
			}),
			/* @__PURE__ */ q("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [
					e.shell && /* @__PURE__ */ q(n, {
						size: "sm",
						variant: "primary",
						onClick: P,
						"data-testid": `${a}-open-shell`,
						children: [/* @__PURE__ */ K("span", {
							"aria-hidden": "true",
							className: "font-mono",
							children: ">_"
						}), " Open shell"]
					}),
					e.onOpenLab && /* @__PURE__ */ K(n, {
						size: "sm",
						variant: "secondary",
						onClick: e.onOpenLab,
						"data-testid": `${a}-open-lab`,
						children: "Open in Computer Lab"
					}),
					!!e.moreActions?.length && /* @__PURE__ */ K(s, {
						trigger: /* @__PURE__ */ K("span", {
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
			/* @__PURE__ */ K("div", {
				className: "overflow-hidden rounded-md border border-border bg-code-bg",
				children: /* @__PURE__ */ K(M, {
					computer: b,
					modelId: g.model,
					...e.idleWindowMs ? { idleWindowMs: e.idleWindowMs } : {},
					className: "border-t-0",
					"data-testid": `${a}-gauges`
				})
			}),
			/* @__PURE__ */ q("div", {
				className: "grid grid-cols-2 gap-2",
				"data-testid": `${a}-metrics`,
				children: [
					/* @__PURE__ */ K(Yt, {
						label: "Model",
						value: A(g.model),
						title: g.model
					}),
					/* @__PURE__ */ K(Yt, {
						label: "Cost",
						value: g.costUsd == null ? "—" : `$${g.costUsd.toFixed(4)}`
					}),
					/* @__PURE__ */ K(Yt, {
						label: "Context",
						value: T,
						title: `${g.contextTokens} tokens used`
					}),
					/* @__PURE__ */ K(Yt, {
						label: "Environment",
						value: _.environment
					})
				]
			}),
			/* @__PURE__ */ K("div", { children: /* @__PURE__ */ K(f, {
				items: I,
				value: L,
				onValueChange: (e) => l(e),
				variant: "underline",
				size: "sm",
				idPrefix: `${a}-tab`,
				"aria-label": "Cloud session view"
			}) }),
			/* @__PURE__ */ K(p, {
				idPrefix: `${a}-tab`,
				id: "activity",
				when: L,
				className: "space-y-2",
				children: /* @__PURE__ */ q(S, {
					active: m.busy,
					particleCount: 200,
					speed: .14,
					alphaParticles: !0,
					moveParticlesOnHover: !0,
					particleHoverFactor: .6,
					particleColors: x,
					fallbackIntensity: "medium",
					seed: C,
					className: "overflow-hidden rounded-md border border-code-border bg-code-bg",
					"data-testid": `${a}-tail`,
					children: [
						/* @__PURE__ */ q("div", {
							className: t("flex items-center gap-2 border-b border-code-border px-2 py-1", m.busy ? "bg-transparent" : "bg-code-panel"),
							children: [
								/* @__PURE__ */ K(c, {
									size: "xs",
									mono: !0,
									palette: "code",
									tone: e.terminalPreview.running ? "success" : "neutral",
									dot: "static",
									children: e.terminalPreview.running ? "tailing" : "idle"
								}),
								m.busy && /* @__PURE__ */ K(c, {
									size: "xs",
									mono: !0,
									palette: "code",
									tone: "info",
									dot: "pulse",
									children: "running"
								}),
								/* @__PURE__ */ K("span", {
									className: "ml-auto shrink-0 font-mono text-[10px] text-code-muted",
									children: "read-only"
								}),
								e.onOpenInNew && /* @__PURE__ */ K(n, {
									tone: "code",
									variant: "ghost",
									size: "sm",
									onClick: e.onOpenInNew,
									"data-testid": `${a}-open-in-new`,
									children: "Open in new"
								})
							]
						}),
						/* @__PURE__ */ q("div", {
							className: "flex items-center gap-2 border-b border-code-border px-2 py-1 font-mono text-[11px]",
							children: [
								/* @__PURE__ */ K("span", {
									"aria-hidden": "true",
									className: "text-code-green",
									children: "▶"
								}),
								/* @__PURE__ */ K("span", {
									className: "min-w-0 truncate text-code-text",
									children: e.label
								}),
								/* @__PURE__ */ K("span", {
									className: "ml-auto shrink-0 text-code-blue",
									children: _.environment
								})
							]
						}),
						/* @__PURE__ */ K(v, {
							lines: D,
							title: null,
							showLevel: !1,
							showSource: !1,
							maxHeight: "16rem",
							emptyMessage: "No output yet.",
							tone: m.busy ? "transparent" : "code",
							className: "rounded-none border-none",
							"data-testid": `${a}-stream`
						})
					]
				})
			}),
			e.shell && /* @__PURE__ */ K(p, {
				idPrefix: `${a}-tab`,
				id: "shell",
				when: L,
				children: /* @__PURE__ */ K(S, {
					active: m.busy,
					particleCount: 90,
					speed: .1,
					alphaParticles: !0,
					particleColors: x,
					fallbackIntensity: "low",
					seed: C,
					className: "space-y-2 rounded-md",
					"data-testid": `${a}-shell-particles`,
					children: e.shell.shellUrl ? /* @__PURE__ */ K(F, {
						fallback: /* @__PURE__ */ K("p", {
							className: "rounded-md border border-code-border bg-code-bg px-2 py-6 text-center font-mono text-[11px] text-code-muted",
							children: "Loading terminal…"
						}),
						children: /* @__PURE__ */ K(zt, {
							sessionId: e.shell.sessionId,
							shellUrl: e.shell.shellUrl,
							className: "flex h-72 min-h-0 flex-col overflow-hidden rounded-md border border-code-border",
							"data-testid": `${a}-terminal`
						})
					}) : /* @__PURE__ */ q(G, { children: [
						/* @__PURE__ */ K(Zt, {
							lines: e.terminalPreview.lines,
							running: e.terminalPreview.running,
							label: e.label,
							environment: _.environment,
							seed: C,
							testId: `${a}-preview`
						}),
						/* @__PURE__ */ K("p", {
							className: "text-xs text-text-secondary",
							children: "The agent is working in a cloud computer. Open a shell to look around its workspace — the same PTY, the same files."
						}),
						/* @__PURE__ */ q(n, {
							size: "sm",
							variant: "primary",
							fullWidth: !0,
							onClick: P,
							disabled: !e.onOpenShell,
							"data-testid": `${a}-connect`,
							children: [/* @__PURE__ */ K("span", {
								"aria-hidden": "true",
								className: "font-mono",
								children: ">_"
							}), " Open shell"]
						})
					] })
				})
			}),
			/* @__PURE__ */ q(p, {
				idPrefix: `${a}-tab`,
				id: "workspace",
				when: L,
				className: "space-y-3",
				children: [
					/* @__PURE__ */ K(Xt, {
						label: "Progress",
						trailing: `${e.progress.length} ${e.progress.length === 1 ? "step" : "steps"}`,
						children: e.progress.length ? /* @__PURE__ */ K("ol", {
							className: "space-y-1.5",
							"data-testid": `${a}-progress`,
							children: e.progress.map((e) => {
								let n = Vt[e.status];
								return /* @__PURE__ */ q("li", {
									"data-state": e.status,
									className: "flex items-baseline gap-2 text-[12px]",
									children: [
										/* @__PURE__ */ K("span", {
											"aria-hidden": "true",
											className: t("mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full", n.dot)
										}),
										/* @__PURE__ */ K("span", {
											className: t("min-w-0 flex-1 truncate", n.text),
											title: e.title,
											children: e.title
										}),
										/* @__PURE__ */ K("span", {
											className: "shrink-0 text-[11px] tabular-nums text-text-tertiary",
											children: qt(e)
										})
									]
								}, e.id);
							})
						}) : /* @__PURE__ */ K("p", {
							className: "text-xs text-text-secondary",
							children: "No plan was recorded for this session."
						})
					}),
					/* @__PURE__ */ K(Xt, {
						label: "Artifacts",
						trailing: `${e.artifacts.length} ${e.artifacts.length === 1 ? "file" : "files"}`,
						children: e.artifacts.length ? /* @__PURE__ */ K("ul", {
							className: "space-y-1",
							"data-testid": `${a}-artifacts`,
							children: e.artifacts.map((e) => /* @__PURE__ */ q("li", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ q("span", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ K("span", {
										className: "block truncate font-mono text-[12px] text-text-primary",
										children: e.name
									}), /* @__PURE__ */ K("span", {
										className: "block truncate text-[11px] text-text-tertiary",
										children: [e.sizeBytes == null ? null : k(e.sizeBytes), e.updatedAt].filter(Boolean).join(" · ")
									})]
								}), e.onDownload && /* @__PURE__ */ K(n, {
									size: "sm",
									variant: "ghost",
									onClick: e.onDownload,
									children: "Download"
								})]
							}, e.id))
						}) : /* @__PURE__ */ K("p", {
							className: "text-xs text-text-secondary",
							children: "This session has not written a file you can see."
						})
					}),
					e.workItem && /* @__PURE__ */ K(Xt, {
						label: "Work item",
						children: (() => {
							let t = e.workItem, n = /* @__PURE__ */ q(G, { children: [/* @__PURE__ */ q("span", {
								className: "flex min-w-0 flex-1 flex-col text-left",
								children: [/* @__PURE__ */ q("span", {
									className: "flex items-baseline gap-2",
									children: [/* @__PURE__ */ K("span", {
										className: "font-mono text-[12px] font-semibold text-text-primary",
										children: t.key
									}), /* @__PURE__ */ K(c, {
										size: "xs",
										children: t.status
									})]
								}), /* @__PURE__ */ K("span", {
									className: "truncate text-[12px] text-text-secondary",
									children: t.title
								})]
							}), t.onOpen && /* @__PURE__ */ K("span", {
								"aria-hidden": "true",
								className: "shrink-0 text-text-tertiary",
								children: "↗"
							})] });
							return /* @__PURE__ */ q(G, { children: [t.onOpen ? /* @__PURE__ */ K("button", {
								type: "button",
								onClick: t.onOpen,
								"data-testid": `${a}-work-item`,
								className: "flex w-full items-center gap-2 rounded-md border border-border p-2 text-left hover:border-border-emphasis focus-visible:outline-2 focus-visible:outline-primary",
								children: n
							}) : /* @__PURE__ */ K("div", {
								"data-testid": `${a}-work-item`,
								className: "flex items-center gap-2 rounded-md border border-border p-2",
								children: n
							}), !!t.tags.length && /* @__PURE__ */ K("div", {
								className: "flex flex-wrap gap-1.5",
								children: t.tags.map((e) => /* @__PURE__ */ K(c, {
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
var $t = {
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
function en({ banner: e }) {
	let n = $t[e.tone];
	return /* @__PURE__ */ q("div", {
		role: "status",
		className: t("flex gap-2 rounded-md border p-2.5", n.card),
		"data-testid": "work-pane-banner",
		"data-tone": e.tone,
		children: [/* @__PURE__ */ K("span", {
			"aria-hidden": "true",
			className: t("mt-1.5 h-2 w-2 shrink-0 rounded-full", n.dot)
		}), /* @__PURE__ */ q("span", {
			className: "min-w-0",
			children: [/* @__PURE__ */ K("span", {
				className: t("block text-[13px] font-semibold", n.title),
				children: e.title
			}), e.description && /* @__PURE__ */ K("span", {
				className: "block text-xs text-text-secondary",
				children: e.description
			})]
		})]
	});
}
function tn({ label: e, children: t }) {
	return /* @__PURE__ */ q("section", {
		className: "space-y-1.5",
		children: [/* @__PURE__ */ K("h3", {
			className: "text-[10px] font-semibold uppercase tracking-wide text-text-tertiary",
			children: e
		}), t]
	});
}
function nn({ item: e, onSelect: t }) {
	let n = /* @__PURE__ */ q(G, { children: [
		/* @__PURE__ */ K("span", {
			"aria-hidden": "true",
			className: "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded bg-info-bg text-[11px] text-info-fg",
			children: "▤"
		}),
		/* @__PURE__ */ q("span", {
			className: "min-w-0 flex-1",
			children: [/* @__PURE__ */ K("span", {
				className: "block truncate text-[13px] font-medium text-text-primary",
				children: e.title
			}), e.meta && /* @__PURE__ */ K("span", {
				className: "block truncate text-xs text-text-tertiary",
				children: e.meta
			})]
		}),
		e.selection && t && /* @__PURE__ */ K("span", {
			"aria-hidden": "true",
			className: "shrink-0 text-text-tertiary",
			children: "↗"
		})
	] });
	return !e.selection || !t ? /* @__PURE__ */ K("div", {
		className: "flex gap-2 rounded-md border border-border p-2",
		children: n
	}) : /* @__PURE__ */ K("button", {
		type: "button",
		className: "flex w-full gap-2 rounded-md border border-border p-2 text-left hover:border-border-emphasis focus-visible:outline-2 focus-visible:outline-primary",
		onClick: () => t(e.selection),
		children: n
	});
}
function rn({ transcript: e, onSelect: t }) {
	let n = V(), [r, i] = W("transcript"), a = e.ask;
	return /* @__PURE__ */ q("div", {
		className: "space-y-3",
		"data-testid": "work-transcript-panel",
		children: [
			/* @__PURE__ */ K(f, {
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
			/* @__PURE__ */ q(p, {
				idPrefix: n,
				id: "transcript",
				when: r,
				className: "space-y-3",
				children: [e.segments.map((e) => /* @__PURE__ */ q("div", {
					className: "space-y-0.5",
					children: [/* @__PURE__ */ q("p", {
						className: "flex items-baseline gap-2 text-xs",
						children: [/* @__PURE__ */ K("span", {
							className: "tabular-nums text-text-tertiary",
							children: e.at
						}), /* @__PURE__ */ K("span", {
							className: "font-semibold text-text-primary",
							children: e.speaker
						})]
					}), /* @__PURE__ */ K("p", {
						className: "text-[13px] leading-snug text-text-secondary",
						children: e.text
					})]
				}, e.id)), !e.segments.length && /* @__PURE__ */ K("p", {
					className: "text-sm text-text-secondary",
					children: "No transcript rows are shared with you."
				})]
			}),
			a && /* @__PURE__ */ K(p, {
				idPrefix: n,
				id: "ask",
				when: r,
				children: /* @__PURE__ */ K(an, {
					ask: a,
					onSelect: t
				})
			})
		]
	});
}
function an({ ask: e, onSelect: t }) {
	let [r, i] = W(""), [a, o] = W(null), [s, c] = W(null), [l, u] = W(!1);
	if (!e.enabled) return /* @__PURE__ */ K("p", {
		className: "text-sm text-text-secondary",
		children: e.unavailableLabel ?? "Ask is unavailable for this transcript."
	});
	let d = async () => {
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
	return /* @__PURE__ */ q("div", {
		className: "space-y-2",
		children: [
			/* @__PURE__ */ K("label", {
				className: "block text-xs text-text-secondary",
				htmlFor: "work-ask-input",
				children: "Ask this transcript"
			}),
			/* @__PURE__ */ q("div", {
				className: "flex gap-1.5",
				children: [/* @__PURE__ */ K(m, {
					id: "work-ask-input",
					size: "sm",
					className: "flex-1",
					placeholder: e.placeholder ?? "Anything for me?",
					value: r,
					onChange: (e) => i(e.target.value),
					onKeyDown: (e) => {
						e.key === "Enter" && d();
					}
				}), /* @__PURE__ */ K(n, {
					size: "sm",
					variant: "primary",
					disabled: l || !r.trim(),
					onClick: () => void d(),
					children: "Ask"
				})]
			}),
			s && /* @__PURE__ */ K("p", {
				role: "status",
				className: "text-xs text-danger-fg",
				children: s
			}),
			a && /* @__PURE__ */ q("div", {
				className: "space-y-2 rounded-md border border-border p-2.5",
				"data-testid": "work-ask-answer",
				children: [
					/* @__PURE__ */ K("p", {
						className: "text-[13px] leading-snug text-text-primary",
						children: a.text
					}),
					!!a.citations?.length && /* @__PURE__ */ K("div", {
						className: "flex flex-wrap gap-1.5",
						children: a.citations.map((e) => e.selection && t ? /* @__PURE__ */ q(n, {
							size: "sm",
							variant: "secondary",
							onClick: () => t(e.selection),
							children: [e.label, " ↗"]
						}, e.id) : /* @__PURE__ */ K(cn, { children: e.label }, e.id))
					}),
					a.note && /* @__PURE__ */ K("p", {
						className: "text-[11px] text-text-tertiary",
						children: a.note
					})
				]
			})
		]
	});
}
function on(e) {
	return e.replace(/\s+/g, " ").trim().toLowerCase();
}
function sn(e, t) {
	let n = on(e);
	return !n || t.some((e) => !!e && (on(e) === n || n.length >= 8 && on(e).includes(n)));
}
function cn({ children: e, title: t, tone: n }) {
	return /* @__PURE__ */ K(c, {
		size: "sm",
		className: "max-w-full min-w-0",
		...t ? { title: t } : {},
		...n ? { tone: n } : {},
		children: /* @__PURE__ */ K("span", {
			className: "min-w-0 truncate",
			children: e
		})
	});
}
function ln({ node: e, detail: r, selection: o, onSelectionChange: s, onClose: c, onOpen: l, onReference: u, live: d, headerAccessory: f, className: p, "data-testid": m = "activity-inspector" }) {
	let h = e.locked || e.disclosure === "existence", g = h ? void 0 : r, _ = e.locked ? "Restricted work item" : e.title, v = g?.sections, y = g?.artifact ? Lt(g.artifact, o) : void 0, b = y?.revision ? {
		...o,
		revisionId: y.revision.id,
		anchorId: y.slide?.id ?? o.anchorId ?? y.revision.anchorId
	} : { ...o }, x = g?.compute, S = g?.banner?.description && sn(g.banner.description, [_, g.subtitle]) ? {
		tone: g.banner.tone,
		title: g.banner.title
	} : g?.banner, C = S && sn(S.title, [_]) ? S.description ? {
		tone: S.tone,
		title: S.description
	} : void 0 : S, w = !h && !!d && e.status === "running" && g?.fresh !== !0, T = w ? g?.subtitle ? `${g.subtitle} · updates delayed` : "Running · updates delayed" : g?.subtitle, E = !!x || !!g?.artifact || !!g?.transcript, D = [
		C?.title,
		C?.description,
		v?.description,
		g?.subtitle,
		g?.excerpt
	], O = E ? [] : (g?.lines ?? []).filter((e, t, n) => n.indexOf(e) === t && !sn(e, D)), k = E ? void 0 : g?.excerpt, A = g?.actions ?? [], j = !!l && !!y?.revision && (e.capabilities.includes("view-document") || e.capabilities.includes("edit-document")), M = !x && !C && !g?.artifact && !g?.transcript && !v && !g?.note && !g?.actions?.length && !k && O.length === 0;
	return /* @__PURE__ */ q("section", {
		"aria-label": _,
		"data-testid": m,
		className: t("flex h-full min-h-0 flex-col border-l border-border bg-surface", p),
		children: [
			/* @__PURE__ */ q("header", {
				className: "flex shrink-0 items-start justify-between gap-2 border-b border-border px-3 py-2",
				children: [/* @__PURE__ */ q("span", {
					className: "flex min-w-0 flex-col",
					children: [/* @__PURE__ */ K("span", {
						className: "truncate text-sm font-semibold text-text-primary",
						"data-testid": `${m}-title`,
						children: _
					}), T && /* @__PURE__ */ K("span", {
						className: "truncate text-xs text-text-tertiary",
						"data-testid": `${m}-subtitle`,
						...w ? { "data-delayed": "true" } : {},
						children: T
					})]
				}), /* @__PURE__ */ q("span", {
					className: "flex shrink-0 items-center gap-2",
					children: [f != null && /* @__PURE__ */ K("span", {
						className: "flex items-center",
						"data-testid": `${m}-accessory`,
						children: f
					}), /* @__PURE__ */ K(i, {
						size: "md",
						"aria-label": "Close details",
						onClick: c,
						"data-testid": `${m}-close`,
						className: "shrink-0",
						children: /* @__PURE__ */ K(a, {})
					})]
				})]
			}),
			/* @__PURE__ */ q("div", {
				className: "min-h-0 flex-1 space-y-4 overflow-auto p-3",
				children: [
					!x && C && /* @__PURE__ */ K(en, { banner: C }),
					x && /* @__PURE__ */ K(Qt, {
						compute: x,
						...C ? { banner: C } : {}
					}),
					k && /* @__PURE__ */ K("p", {
						className: "text-[13px] italic leading-snug text-text-primary",
						"data-testid": `${m}-excerpt`,
						children: `“${k}”`
					}),
					O.length > 0 && /* @__PURE__ */ K("ul", {
						className: "space-y-0.5 text-[13px] leading-snug text-text-secondary",
						"data-testid": `${m}-lines`,
						children: O.map((e, t) => /* @__PURE__ */ K("li", { children: e }, `${t}-${e}`))
					}),
					v?.description && /* @__PURE__ */ K("p", {
						className: "text-[13px] leading-snug text-text-secondary",
						children: v.description
					}),
					g?.artifact && /* @__PURE__ */ K(Rt, {
						node: e,
						artifact: g.artifact,
						selection: o,
						onSelectionChange: s,
						quiet: !!g.banner
					}),
					g?.transcript && /* @__PURE__ */ K(rn, {
						transcript: g.transcript,
						onSelect: s
					}),
					!!v?.inputs?.length && /* @__PURE__ */ K(tn, {
						label: "Inputs",
						children: /* @__PURE__ */ K("div", {
							className: "flex flex-wrap gap-1.5",
							children: v.inputs.map((e, t) => typeof e == "string" ? /* @__PURE__ */ K(cn, { children: e }, `${t}-${e}`) : /* @__PURE__ */ K(cn, {
								title: e.meta,
								children: e.title
							}, e.id))
						})
					}),
					!!v?.tools?.length && /* @__PURE__ */ K(tn, {
						label: "Tools in this run",
						children: /* @__PURE__ */ K("div", {
							className: "flex flex-wrap gap-1.5",
							children: v.tools.map((e, t) => /* @__PURE__ */ K(cn, {
								tone: "info",
								children: e
							}, `${t}-${e}`))
						})
					}),
					!!v?.sources?.length && /* @__PURE__ */ K(tn, {
						label: "Sources used",
						children: /* @__PURE__ */ K("div", {
							className: "space-y-1.5",
							children: v.sources.map((e) => /* @__PURE__ */ K(nn, {
								item: e,
								onSelect: s
							}, e.id))
						})
					}),
					v?.workItem && /* @__PURE__ */ K(tn, {
						label: "Work item",
						children: /* @__PURE__ */ K(nn, {
							item: v.workItem,
							onSelect: s
						})
					}),
					g?.note && /* @__PURE__ */ K("p", {
						className: "text-xs leading-snug text-text-tertiary",
						children: g.note
					}),
					M && /* @__PURE__ */ K("p", {
						className: "text-sm text-text-secondary",
						children: h ? "Only the existence of this work is shared with you." : "No further detail is shared with you."
					})
				]
			}),
			(j || A.length > 0 || u && !h) && /* @__PURE__ */ q("div", {
				className: "shrink-0 space-y-2 border-t border-border p-2",
				"data-testid": `${m}-footer`,
				children: [(j || A.length > 0) && /* @__PURE__ */ q("div", {
					className: "grid gap-2",
					"data-testid": `${m}-actions`,
					children: [j && /* @__PURE__ */ K(n, {
						size: "sm",
						variant: "primary",
						fullWidth: !0,
						onClick: () => l(b),
						children: "Open presentation"
					}), A.map((e) => /* @__PURE__ */ K(n, {
						size: "sm",
						variant: "secondary",
						fullWidth: !0,
						onClick: () => {
							e.onSelect?.(), e.selection && s(e.selection);
						},
						children: e.label
					}, e.id))]
				}), u && !h && /* @__PURE__ */ K(n, {
					size: "sm",
					variant: "secondary",
					fullWidth: !0,
					onClick: () => u(b),
					children: "Reference in chat"
				})]
			})
		]
	});
}
//#endregion
//#region src/components/forms/RangeSlider.tsx
function un({ value: e, min: n, max: r, step: i = 1, minDistance: a = i, labels: o, formatValue: s, onChange: c, className: l }) {
	let u = V(), d = Math.max(1, r - n), f = (e) => Math.max(n, Math.min(r, e)), p = f(e[0]), m = Math.max(p, f(e[1])), h = Math.min(a, r - n);
	return /* @__PURE__ */ q("div", {
		className: t("relative h-7 min-w-0", l),
		children: [
			/* @__PURE__ */ K("div", { className: "absolute inset-x-0 top-3 h-1 rounded-full bg-surface-inset" }),
			/* @__PURE__ */ K("div", {
				className: "absolute top-3 h-1 rounded-full bg-primary/30",
				style: {
					left: `${(p - n) / d * 100}%`,
					right: `${(r - m) / d * 100}%`
				}
			}),
			[0, 1].map((e) => /* @__PURE__ */ K("input", {
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
var dn = 6e4, fn = 60 * dn, pn = [
	[2 * fn, 30 * dn],
	[6 * fn, fn],
	[12 * fn, 2 * fn],
	[Infinity, 3 * fn]
];
function mn({ activity: e, timezone: r = "UTC" }) {
	let { bounds: a, window: o, onWindowChange: s } = e, c = Math.max(dn, o.end - o.start), l = new Intl.DateTimeFormat(void 0, {
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
	}, p = e.now ?? (o.following ? o.end : Date.now()), m = e.temporalMode === "recent" || o.following ? Math.min(a.end, Math.max(a.start + dn, p)) : a.end, h = Math.max(1, m - a.start), g = (e) => Math.min(100, Math.max(0, (e - a.start) / h * 100)), _ = (e, t, n = c) => {
		let r = Math.max(a.start + Math.min(n, h), Math.min(m, e));
		s({
			start: Math.max(a.start, r - n),
			end: r,
			following: t
		});
	}, v = [
		15,
		30,
		60
	].find((e) => c === e * dn), y = o.start === a.start && o.end >= m, b = o.end >= m, x = [Math.min(Math.max(o.start, a.start), m), Math.min(Math.max(o.end, a.start), m)], S = pn.find(([e]) => h <= e)[1], C = [];
	for (let e = Math.ceil(a.start / S) * S; e <= m; e += S) (e - a.start) / h < .82 && C.push(e);
	return /* @__PURE__ */ q("div", {
		className: "shrink-0 border-b border-border bg-surface px-3 pb-3 pt-2",
		"aria-label": "Work time window",
		children: [
			/* @__PURE__ */ q("div", {
				className: "flex flex-wrap items-center gap-1.5 text-xs text-text-secondary",
				children: [
					/* @__PURE__ */ q("strong", {
						"aria-live": "polite",
						title: r,
						className: "tabular-nums font-semibold text-text-primary",
						children: [
							f(x[0]),
							" – ",
							b ? "Now" : f(x[1])
						]
					}),
					/* @__PURE__ */ K("span", { className: "flex-1" }),
					/* @__PURE__ */ K(i, {
						size: "sm",
						"aria-label": "Previous interval",
						disabled: o.start <= a.start,
						onClick: () => _(o.end - c, !1),
						children: "‹"
					}),
					/* @__PURE__ */ K(i, {
						size: "sm",
						"aria-label": "Next interval",
						disabled: b,
						onClick: () => _(o.end + c, !1),
						children: "›"
					}),
					/* @__PURE__ */ q(n, {
						size: "sm",
						variant: "secondary",
						disabled: o.following,
						onClick: () => _(m, !0),
						children: [/* @__PURE__ */ K("span", {
							"aria-hidden": "true",
							className: t("mr-1 inline-block h-1.5 w-1.5 rounded-full align-middle", o.following ? "bg-success" : "bg-border-emphasis")
						}), o.following ? "Following now" : "Back to now"]
					}),
					/* @__PURE__ */ K(D, {
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
						onChange: (e) => _(o.end, o.following, e.target.value === "day" ? h : Number(e.target.value) * dn)
					})
				]
			}),
			/* @__PURE__ */ q("div", {
				className: "relative mx-1 mt-2 h-4 text-[10px] text-text-tertiary",
				"aria-hidden": "true",
				"data-testid": "work-time-ruler",
				children: [C.map((e) => /* @__PURE__ */ K("span", {
					className: "absolute top-0 -translate-x-1/2 first:translate-x-0 tabular-nums",
					style: { left: `${g(e)}%` },
					children: f(e)
				}, e)), /* @__PURE__ */ q("span", {
					className: "absolute right-0 top-0 font-semibold tabular-nums text-text-secondary",
					children: ["Now ", f(m)]
				})]
			}),
			/* @__PURE__ */ K("div", {
				className: "relative mx-1 h-3 border-b border-border",
				"aria-label": "Activity markers",
				children: e.events?.filter((e) => e.at >= a.start && e.at <= m && e.count > 0).map((e) => {
					let n = e.at >= x[0] && e.at <= x[1];
					return /* @__PURE__ */ K("button", {
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
			/* @__PURE__ */ K(un, {
				className: "mx-1",
				value: x,
				min: a.start,
				max: m,
				step: dn,
				labels: ["Interval start", "Interval end"],
				formatValue: u,
				onChange: ([e, t]) => s({
					start: e,
					end: t,
					following: !1
				})
			}),
			!o.following && e.temporalMode === "recent" && /* @__PURE__ */ K("p", {
				className: "text-xs text-text-secondary",
				children: "Recent work · statuses reflect the latest available state"
			})
		]
	});
}
//#endregion
//#region src/components/graph/work/WorkActivityGraph.tsx
var hn = 820, gn = 720;
function _n(e) {
	let { nodes: r, edges: i, selection: a, activity: o, onSelectionChange: s, onMaxEffortsChange: c } = e, l = U(null), u = U(null), d = U(null), [f, p] = W(!1), [m, h] = W(!0), [g, _] = W(!1), [v, y] = W(null), [b, x] = W(e.maxEfforts ?? 2), S = c ? e.maxEfforts ?? 2 : b, C = (e) => {
		if (!c) {
			x(e);
			return;
		}
		c(e);
	}, w = a?.kind === "node" ? a.id : null, T = o.view.focusedEffortId ?? null, E = T ?? (w ? o.efforts.find((e) => e.nodeIds.includes(w))?.id ?? null : null), D = yt(o.efforts, r, {
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
	let M = j ? i.filter((e) => j.has(e.id)) : i, P = (T ? 0 : o.efforts.length - O) > 0 ? /* @__PURE__ */ q("div", {
		className: "flex flex-wrap items-center justify-between gap-2 border-t border-border pt-2 text-xs text-text-tertiary",
		"data-testid": "work-activity-list-more",
		children: [/* @__PURE__ */ q("span", { children: [
			"Showing ",
			O,
			" of ",
			o.efforts.length,
			" activities · Newest work first"
		] }), /* @__PURE__ */ q(n, {
			size: "sm",
			variant: "secondary",
			onClick: () => C(0),
			children: [
				"Show all ",
				o.efforts.length,
				" activities"
			]
		})]
	}) : void 0, F = (e) => Me(e.status, o.details?.[e.id]?.pause), I = /* @__PURE__ */ K(Ke, {
		...e,
		edges: M,
		groups: A,
		footer: P,
		statusLabelOf: F
	}), L = a?.kind === "node" ? r.find((e) => e.id === a.id) : void 0, R = a?.kind === "edge" ? i.find((e) => e.id === a.id && r.some((t) => t.id === e.fromId) && r.some((t) => t.id === e.toId)) : void 0, z = !!(L || R), { window: V, bounds: H, onWindowChange: G, onEarlier: ee } = o, J = o.detailsPlacement ?? "auto", te = J === "overlay" || J === "auto" && !m;
	B(() => {
		a && !z && s(null);
	}, [
		a,
		z,
		s
	]), B(() => {
		a && l.current?.contains(document.activeElement) && document.activeElement instanceof HTMLElement && !document.activeElement.closest("[data-testid=\"activity-inspector\"]") && (d.current = document.activeElement);
	}, [a]), B(() => {
		let e = u.current;
		if (!e || typeof ResizeObserver > "u") return;
		let t = new ResizeObserver(([e]) => h(e.contentRect.width >= hn));
		return t.observe(e), () => t.disconnect();
	}, []), B(() => {
		let e = l.current;
		if (!e || typeof ResizeObserver > "u") return;
		let t = new ResizeObserver(([e]) => _(e.contentRect.height < gn));
		return t.observe(e), () => t.disconnect();
	}, []);
	let ne = () => {
		s(null), requestAnimationFrame(() => {
			d.current?.isConnected && d.current.focus();
		});
	}, Y = () => {
		if (ee) {
			ee();
			return;
		}
		let e = Math.max(6e4, V.end - V.start), t = Math.max(H.start, V.start - e);
		G({
			start: t,
			end: t + e,
			following: !1
		});
	}, re = z, X = a ? `${a.kind}:${a.id}` : null, ie = re && e.viewport.zoom < .4 && v !== X, Z = ie || f && g, ae = f && !Z, oe = Z || ae, se = () => {
		if (!oe) {
			p(!0);
			return;
		}
		p(!1), ie && y(X);
	}, Q = te ? "absolute inset-y-0 right-0 z-10 w-[min(340px,85%)] shadow-lg" : "w-[340px] max-w-[45%] shrink-0";
	return /* @__PURE__ */ q("section", {
		ref: l,
		"aria-label": "Shared work graph",
		className: t("flex h-full min-h-0 min-w-0 flex-col bg-surface", e.className),
		onKeyDown: (e) => {
			e.key === "Escape" && a && (e.stopPropagation(), ne());
		},
		children: [
			o.title && /* @__PURE__ */ K(It, {
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
			e.state === "partial" && /* @__PURE__ */ K("p", {
				role: "status",
				className: "border-b border-warning-border bg-warning-bg px-3 py-1 text-xs text-warning-fg",
				children: "Some work sources are delayed or unavailable."
			}),
			/* @__PURE__ */ q("div", {
				ref: u,
				className: "relative flex min-h-0 min-w-0 flex-1",
				children: [/* @__PURE__ */ q("div", {
					className: "flex min-h-0 min-w-0 flex-1 flex-col",
					children: [
						/* @__PURE__ */ K(mn, {
							activity: o,
							timezone: e.timezone
						}),
						/* @__PURE__ */ q("div", {
							className: "relative flex min-h-0 flex-1 flex-col overflow-hidden",
							"data-testid": "work-activity-region",
							"data-list": Z ? "region" : void 0,
							children: [/* @__PURE__ */ K("div", {
								className: t("flex min-h-0 flex-1 flex-col", Z && "invisible"),
								"aria-hidden": Z || void 0,
								inert: Z || void 0,
								children: /* @__PURE__ */ K(Mt, {
									...e,
									maxEfforts: S,
									onViewAsList: () => p(!0)
								})
							}), Z && /* @__PURE__ */ K("div", {
								className: "absolute inset-0 overflow-auto bg-surface p-3",
								"data-testid": "work-activity-list-region",
								children: I
							})]
						}),
						/* @__PURE__ */ q("div", {
							className: "flex h-9 shrink-0 items-center justify-between gap-2 border-t border-border px-4 text-[10px] text-text-tertiary",
							"data-testid": "work-activity-footer",
							children: [o.view.focusedEffortId ? /* @__PURE__ */ K(n, {
								size: "sm",
								variant: "ghost",
								onClick: () => o.onViewChange({
									...o.view,
									focusedEffortId: null
								}),
								children: "← All activities"
							}) : /* @__PURE__ */ q("span", { children: [O < o.efforts.length ? `Showing ${O} of ${o.efforts.length} parallel activities` : `${o.efforts.length} parallel activities`, " · Newest work first"] }), /* @__PURE__ */ K(n, {
								size: "sm",
								variant: "ghost",
								disabled: V.start <= H.start,
								onClick: Y,
								children: "← Earlier work"
							})]
						})
					]
				}), J !== "none" && z && (L && a?.kind === "node" ? /* @__PURE__ */ K(ln, {
					node: L,
					detail: o.details?.[L.id],
					selection: a,
					onSelectionChange: s,
					onClose: ne,
					onOpen: e.onOpen,
					onReference: e.onReference,
					className: Q
				}) : /* @__PURE__ */ K(N, {
					title: R?.label || "Relationship",
					onClose: ne,
					className: Q,
					"data-testid": "activity-inspector",
					children: /* @__PURE__ */ K(Ze, { ...e })
				}))]
			}),
			/* @__PURE__ */ K("div", {
				className: "shrink-0 border-t border-border px-2 py-1",
				children: /* @__PURE__ */ K(n, {
					size: "sm",
					variant: "ghost",
					"aria-expanded": oe,
					onClick: se,
					"data-testid": "work-activity-list-toggle",
					children: ie ? "Show the graph" : oe ? "Hide accessible list" : "View as accessible list"
				})
			}),
			ae && /* @__PURE__ */ K("div", {
				className: "max-h-60 min-h-0 shrink-0 overflow-auto border-t border-border p-3",
				"data-testid": "work-activity-list-below",
				children: I
			})
		]
	});
}
//#endregion
//#region src/components/graph/work/WorkGraph.tsx
var vn = 328, yn = 224, bn = {
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
function xn(e) {
	return e.locked ? "Restricted work item" : e.title.trim() || "Untitled work item";
}
function Sn({ data: e }) {
	return /* @__PURE__ */ q("div", {
		className: "w-[248px]",
		children: [
			/* @__PURE__ */ K(Y, {
				type: "target",
				position: X.Left,
				isConnectable: !1,
				className: "opacity-0"
			}),
			/* @__PURE__ */ K(ze, {
				node: e.entity,
				selected: e.selected,
				onSelect: e.onSelect,
				onOpen: e.onOpen
			}),
			/* @__PURE__ */ K(Y, {
				type: "source",
				position: X.Right,
				isConnectable: !1,
				className: "opacity-0"
			})
		]
	});
}
function Cn({ id: t, sourceX: n, sourceY: r, targetX: i, targetY: a, sourcePosition: o, targetPosition: s, markerEnd: c, data: l }) {
	let u = e(), [d, f, p] = Z({
		sourceX: n,
		sourceY: r,
		targetX: i,
		targetY: a,
		sourcePosition: o,
		targetPosition: s
	});
	if (!l) return null;
	let m = l.entity.status === "running" && !l.entity.endedAt;
	return /* @__PURE__ */ q(G, { children: [
		/* @__PURE__ */ K(J, {
			id: t,
			path: d,
			markerEnd: c,
			interactionWidth: 24,
			className: l.selected ? "stroke-primary" : "stroke-border-emphasis"
		}),
		m && !u ? /* @__PURE__ */ K("circle", {
			r: "4",
			className: "fill-primary",
			"aria-hidden": "true",
			"data-testid": `work-edge-motion-${l.entity.id}`,
			children: /* @__PURE__ */ K("animateMotion", {
				dur: "2s",
				repeatCount: "indefinite",
				path: d
			})
		}) : null,
		/* @__PURE__ */ K("foreignObject", {
			x: f - 104,
			y: p - 40,
			width: "208",
			height: "80",
			className: "overflow-visible",
			children: /* @__PURE__ */ K("div", {
				className: "nodrag nopan w-52",
				"data-work-edge-label": l.entity.id,
				children: /* @__PURE__ */ K(Ve, {
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
var wn = { work: Sn }, Tn = { work: Cn };
function En(e, t) {
	let n = new Set(e.map((e) => e.id)), r = new Map(e.map((e) => [e.id, 0])), i = new Map(e.map((e) => [e.id, []]));
	for (let e of t) !n.has(e.fromId) || !n.has(e.toId) || e.fromId === e.toId || (i.get(e.fromId)?.push(e.toId), r.set(e.toId, (r.get(e.toId) ?? 0) + 1));
	let a = /* @__PURE__ */ new Map(), o = e.filter((e) => r.get(e.id) === 0).sort(Dn).map((e) => e.id);
	for (let e of o) a.set(e, 0);
	for (let e = 0; e < o.length; e += 1) {
		let t = o[e], n = (a.get(t) ?? 0) + 1;
		for (let e of (i.get(t) ?? []).sort()) a.set(e, Math.max(a.get(e) ?? 0, n)), r.set(e, (r.get(e) ?? 1) - 1), r.get(e) === 0 && o.push(e);
	}
	for (let t of [...e].sort(Dn)) a.has(t.id) || a.set(t.id, bn[t.kind] % 4);
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
			return n(e.id) - n(t.id) || Dn(e, t);
		}), t.forEach((t, n) => {
			u.set(t.id, n), c.set(t.id, {
				x: 48 + e * vn,
				y: 48 + n * yn
			});
		});
	}
	return c;
}
function Dn(e, t) {
	return bn[e.kind] - bn[t.kind] || e.id.localeCompare(t.id);
}
function On(e, t, n) {
	return e ? e.kind === "node" ? t.some((t) => t.id === e.id) : n.some((t) => t.id === e.id) : !1;
}
function kn({ state: e, errorMessage: t, onRetry: r }) {
	return e === "loading" ? /* @__PURE__ */ K("div", {
		role: "status",
		"data-testid": "work-graph-loading",
		className: "flex min-h-[22rem] items-center justify-center rounded-lg border border-border bg-surface text-sm text-text-secondary",
		children: "Loading shared work…"
	}) : e === "error" ? /* @__PURE__ */ K(l, {
		testId: "work-graph-error",
		icon: "!",
		title: "Shared work is unavailable",
		description: t || "The work graph could not be loaded.",
		action: r ? /* @__PURE__ */ K(n, {
			onClick: r,
			children: "Try again"
		}) : void 0
	}) : /* @__PURE__ */ K(l, {
		testId: "work-graph-empty",
		icon: "○",
		title: "No shared work",
		description: "There is no shared work available for this day."
	});
}
function An({ nodes: e, edges: n, selection: r, viewport: i, day: a, timezone: o, sources: s = [], state: c = "ready", errorMessage: l, className: u, onSelectionChange: d, onViewportChange: f, onRetry: p, onOpen: m, onReference: h, onRequestCollaboration: g }) {
	let _ = H(() => new Set(e.map((e) => e.id)), [e]), v = H(() => n.filter((e) => _.has(e.fromId) && _.has(e.toId)), [n, _]), y = On(r, e, v) ? r : null;
	B(() => {
		r && !y && d(null);
	}, [
		y,
		d,
		r
	]);
	let b = En(e.map((e) => ({
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
			fromLabel: xn(x.get(e.fromId)),
			toLabel: xn(x.get(e.toId)),
			onSelect: (e) => d({
				kind: "edge",
				id: e
			})
		}
	}));
	if (c === "loading" || c === "error" || c === "empty" || e.length === 0) return /* @__PURE__ */ K("section", {
		"aria-label": "Shared work graph",
		className: t("min-w-0", u),
		children: /* @__PURE__ */ K(kn, {
			state: c === "ready" ? "empty" : c,
			errorMessage: l,
			onRetry: p
		})
	});
	let w = s.filter((e) => e.health !== "available");
	return /* @__PURE__ */ q("section", {
		"aria-label": "Shared work graph",
		className: t("min-w-0 space-y-4", u),
		"data-state": c,
		children: [
			c === "partial" ? /* @__PURE__ */ q("div", {
				role: "status",
				"data-testid": "work-graph-partial",
				className: "rounded-lg border border-warning-border bg-warning-bg px-3 py-2 text-sm text-warning-fg",
				children: [/* @__PURE__ */ K("p", {
					className: "font-medium",
					children: "Some work sources are unavailable or delayed."
				}), w.length > 0 ? /* @__PURE__ */ K("ul", {
					className: "mt-1 list-disc pl-5 text-xs",
					children: w.map((e) => /* @__PURE__ */ K("li", { children: e.message || `${e.source} is ${e.health}.` }, e.source))
				}) : null]
			}) : null,
			a ? /* @__PURE__ */ K(ut, {
				day: a,
				timezone: o || "UTC",
				nodes: e,
				edges: v,
				selection: y,
				onSelectionChange: d
			}) : null,
			/* @__PURE__ */ q("div", {
				className: "grid min-w-0 grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_20rem]",
				"data-testid": "work-graph-layout",
				children: [/* @__PURE__ */ K("div", {
					className: "relative h-[clamp(22rem,55vh,42rem)] min-w-0 overflow-hidden rounded-lg border border-border bg-surface",
					"data-testid": "work-graph-canvas",
					children: /* @__PURE__ */ q(ie, {
						nodes: S,
						edges: C,
						nodeTypes: wn,
						edgeTypes: Tn,
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
						children: [/* @__PURE__ */ K(ee, {
							gap: 20,
							size: 1,
							color: "var(--color-border)"
						}), /* @__PURE__ */ K(te, { showInteractive: !1 })]
					})
				}), /* @__PURE__ */ K(Ze, {
					nodes: e,
					edges: v,
					selection: y,
					onSelectionChange: d,
					onOpen: m,
					onReference: h,
					onRequestCollaboration: g
				})]
			}),
			/* @__PURE__ */ K(Ke, {
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
function jn(e) {
	return e.activity && e.nodes.length > 0 && e.state !== "loading" && e.state !== "error" && e.state !== "empty" ? /* @__PURE__ */ K(_n, {
		...e,
		activity: e.activity
	}) : /* @__PURE__ */ K(An, { ...e });
}
//#endregion
export { se as A, we as C, fe as D, Ee as E, ce as M, ae as N, ye as O, oe as P, Oe as S, Te as T, ze as _, rn as a, Ae as b, It as c, yt as d, st as f, Ve as g, Ke as h, en as i, Q as j, he as k, gt as l, Ze as m, un as n, Qt as o, at as p, ln as r, Rt as s, jn as t, ht as u, Ne as v, De as w, ke as x, Me as y };
