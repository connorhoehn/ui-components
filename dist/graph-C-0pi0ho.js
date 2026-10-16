import { t as e } from "./usePrefersReducedMotion-Cllucr7i.js";
import { t } from "./cn-D4QmbyEy.js";
import { n, o as r } from "./Button-uREUOWUk.js";
import { t as i } from "./Card-CbTNNNkk.js";
import { f as a, h as o, n as s, p as c } from "./overlayStack-C0EBgmzL.js";
import { t as l } from "./IconButton-IE5g44md.js";
import { S as u, d, et as f, f as p, h as m, ht as h, wt as g } from "./Icons-GSE-QGuJ.js";
import { c as _, i as v, l as y, r as b, t as x } from "./Text-4BIlhd_-.js";
import { t as S } from "./Input-_B49FdRY.js";
import { t as C } from "./Select-DjpQtNw3.js";
import { t as w } from "./Tooltip-DWyAb81m.js";
import { t as T } from "./EmptyState-CpS13Gy4.js";
import { t as E } from "./Spinner-CYflBP-c.js";
import { n as D, t as O } from "./StatusPill-CLkB5jFS.js";
import { n as k, t as A } from "./FilterChip-CRbJ6bUi.js";
import { t as j } from "./SkeletonCard-D3FL0TB7.js";
import { t as ee } from "./DropdownMenu-BvzGTOgf.js";
import { t as M } from "./Avatar-CpUrJRJP.js";
import { t as N } from "./TitledFrame-B0QW93da.js";
import { t as P } from "./StatusDot-GwVn-q5q.js";
import { t as te } from "./SegmentedControl-CSn7GyT9.js";
import { t as F } from "./InlineAlert-CBtteaVZ.js";
import { t as I } from "./CardHeader-C50GEAmo.js";
import { t as L } from "./LogStream-Bk8DVIVb.js";
import { a as ne, o as R, s as re } from "./backdropTone-BzPocySl.js";
import { a as z, i as ie, n as B, r as ae, t as oe } from "./MeterRow-7m0okaBy.js";
import { t as se } from "./useMeasuredWidth-Dv1skbGr.js";
import { t as ce } from "./SectionLabel-Ch_rkHQZ.js";
import { t as V } from "./Link-h2c9gcsw.js";
import { t as H } from "./MetaLine-DFn2XXGU.js";
import { t as le } from "./Checkbox-Jycr-rlf.js";
import { n as ue } from "./ChatSidePanelRegistry-CMCTPWkw.js";
import { n as U } from "./useComputeProjects-ZSazDRet.js";
import { t as de } from "./formatBytes-05ivRSJY.js";
import { n as fe, r as pe } from "./PaneStatusLine-xsRiN9Y9.js";
/* empty css               */
import { t as me } from "./AnimatedEdge-DnsfF8-D.js";
import { Suspense as he, createContext as ge, lazy as _e, useCallback as W, useContext as ve, useEffect as G, useId as ye, useImperativeHandle as be, useMemo as K, useRef as q, useState as J } from "react";
import { Fragment as Y, jsx as X, jsxs as Z } from "react/jsx-runtime";
import { Background as xe, BaseEdge as Se, Controls as Ce, EdgeLabelRenderer as we, Handle as Q, MarkerType as Te, Position as $, ReactFlow as Ee, ReactFlowProvider as De, getBezierPath as Oe, getSmoothStepPath as ke, useReactFlow as Ae, useStore as je, useViewport as Me } from "@xyflow/react";
import { forceCenter as Ne, forceCollide as Pe, forceLink as Fe, forceManyBody as Ie, forceSimulation as Le, forceX as Re, forceY as ze } from "d3-force";
var Be = ge({ right: 0 });
function Ve() {
	return ve(Be);
}
//#endregion
//#region src/components/graph/layout.ts
function He(e) {
	let t = e.find((e) => e.group === "center");
	if (t) return t;
	let n = null, r = !1;
	for (let t of e) typeof t.weight == "number" && (!n || t.weight > n.weight ? (n = t, r = !1) : t.weight === n.weight && (r = !0));
	return n && !r ? n : null;
}
function Ue(e) {
	let t = [];
	for (let n of e) {
		let e = n.group ?? "";
		e !== "center" && (t.includes(e) || t.push(e));
	}
	return t;
}
function We(e, t, n, r) {
	if (e.length === 0) return /* @__PURE__ */ new Map();
	switch (n) {
		case "grid": return Ke(e, r);
		case "force": return qe(e, t, r);
		default: return Ge(e, r);
	}
}
function Ge(e, { width: t, height: n, padding: r = 40 }) {
	let i = /* @__PURE__ */ new Map(), a = t / 2, o = n / 2, s = He(e), c = e.filter((e) => e !== s);
	if (s && i.set(s.id, {
		x: a,
		y: o
	}), c.length === 0) return i;
	let l = Ue(c), u = /* @__PURE__ */ new Map();
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
				x: Je(a + r * Math.cos(n)),
				y: Je(o + r * Math.sin(n))
			});
		});
	}), i;
}
function Ke(e, { width: t, height: n, padding: r = 40 }) {
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
				x: Je(n),
				y: Je(u)
			});
		});
	}), i;
}
function qe(e, t, { width: n, height: r, padding: i = 40 }) {
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
			x: Je(b + (s[t] - p) * y),
			y: Je(x + (c[t] - h) * y)
		});
	}), S;
}
function Je(e) {
	return Math.round(e * 100) / 100;
}
//#endregion
//#region src/components/graph/NodeGraph.tsx
var Ye = 480, Xe = [
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
], Ze = {
	fill: "fill-primary",
	bg: "bg-primary"
};
function Qe(e, t) {
	if (e === "center") return Ze;
	let n = t.indexOf(e ?? "");
	return Xe[(n < 0 ? 0 : n) % Xe.length];
}
var $e = .5, et = 4, tt = {
	x: 0,
	y: 0,
	k: 1
};
function nt({ nodes: e, edges: n, layout: r = "radial", selectedId: i = null, onSelect: a, height: o = 320, className: s, "data-testid": c = "node-graph" }) {
	let u = K(() => We(e, n, r, {
		width: 480,
		height: o
	}), [
		e,
		n,
		r,
		480,
		o
	]), d = K(() => Ue(e), [e]), f = K(() => He(e), [e]), p = K(() => rt(e, f), [e, f]), [m, h] = J(tt), [g, _] = J(null), v = q(null), y = q(null), [b, x] = J(!1), S = () => {
		let e = v.current?.getBoundingClientRect();
		return e && e.width > 0 ? 480 / e.width : 1;
	};
	G(() => {
		let e = v.current;
		if (!e) return;
		let t = (t) => {
			t.preventDefault();
			let n = e.getBoundingClientRect(), r = n.width > 0 ? 480 / n.width : 1, i = (t.clientX - n.left) * r, a = (t.clientY - n.top) * r;
			h((e) => {
				let n = at(e.k * (t.deltaY < 0 ? 1.1 : 1 / 1.1), $e, et), r = n / e.k;
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
	G(() => {
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
	}, E = m.x === 0 && m.y === 0 && m.k === 1, D = K(() => new Map(e.map((e) => [e.id, e])), [e]);
	return /* @__PURE__ */ Z("div", {
		className: t("relative flex flex-col overflow-hidden rounded-lg border border-border bg-surface", s),
		"data-testid": c,
		children: [
			/* @__PURE__ */ X("svg", {
				ref: v,
				role: "img",
				"aria-label": `Graph of ${e.length} nodes`,
				viewBox: `0 0 480 ${o}`,
				width: "100%",
				height: o,
				className: t("block select-none touch-none", b ? "cursor-grabbing" : "cursor-grab"),
				onMouseDown: C,
				"data-testid": `${c}-svg`,
				children: /* @__PURE__ */ Z("g", {
					transform: `translate(${m.x} ${m.y}) scale(${m.k})`,
					"data-testid": `${c}-viewport`,
					children: [n.map((e, t) => {
						let n = u.get(e.from), r = u.get(e.to);
						if (!n || !r) return null;
						let a = i !== null && (e.from === i || e.to === i);
						return /* @__PURE__ */ Z("g", {
							"data-testid": `${c}-edge-${e.from}-${e.to}`,
							children: [/* @__PURE__ */ X("line", {
								x1: n.x,
								y1: n.y,
								x2: r.x,
								y2: r.y,
								strokeWidth: it(e.weight),
								className: a ? "stroke-primary" : "stroke-border-emphasis"
							}), e.label && /* @__PURE__ */ X("text", {
								x: (n.x + r.x) / 2,
								y: (n.y + r.y) / 2 - 4,
								textAnchor: "middle",
								className: "fill-text-tertiary text-[10px]",
								"data-testid": `${c}-edge-label-${e.from}-${e.to}`,
								children: e.label
							})]
						}, `${e.from}->${e.to}#${t}`);
					}), e.map((e) => {
						let n = u.get(e.id);
						if (!n) return null;
						let r = p.get(e.id) ?? 16, a = e.id === i, o = Qe(e.group, d), s = `${c}-clip-${e.id}`;
						return /* @__PURE__ */ Z("g", {
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
							"data-testid": `${c}-node-${e.id}`,
							"data-selected": a || void 0,
							children: [
								/* @__PURE__ */ X("title", { children: e.sublabel ?? e.label }),
								(a || g === e.id) && /* @__PURE__ */ X("circle", {
									r: r + 4,
									className: t("fill-none", a ? "stroke-primary" : "stroke-border-emphasis"),
									strokeWidth: 2,
									strokeDasharray: a ? void 0 : "3 3"
								}),
								e.avatarUrl ? /* @__PURE__ */ Z(Y, { children: [
									/* @__PURE__ */ X("clipPath", {
										id: s,
										children: /* @__PURE__ */ X("circle", { r })
									}),
									/* @__PURE__ */ X("circle", {
										r,
										className: t("stroke-surface", o.fill),
										strokeWidth: 2
									}),
									/* @__PURE__ */ X("image", {
										href: e.avatarUrl,
										x: -r,
										y: -r,
										width: r * 2,
										height: r * 2,
										clipPath: `url(#${s})`,
										preserveAspectRatio: "xMidYMid slice"
									})
								] }) : /* @__PURE__ */ X("circle", {
									r,
									fill: e.color,
									className: t("stroke-surface", !e.color && o.fill),
									strokeWidth: 2
								}),
								!e.avatarUrl && /* @__PURE__ */ X("text", {
									y: 1,
									textAnchor: "middle",
									dominantBaseline: "middle",
									className: "pointer-events-none fill-white text-[10px] font-semibold",
									children: ot(e.label)
								}),
								/* @__PURE__ */ X("text", {
									y: r + 12,
									textAnchor: "middle",
									className: "pointer-events-none fill-text-primary text-[11px]",
									children: e.label
								}),
								e === f && e.sublabel && /* @__PURE__ */ X("text", {
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
			/* @__PURE__ */ Z("div", {
				className: "pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-2",
				children: [d.length > 0 && (d.length > 1 || d[0] !== "") ? /* @__PURE__ */ X("ul", {
					"aria-label": "Legend",
					className: "pointer-events-auto flex flex-wrap gap-x-3 gap-y-1 rounded-md bg-surface/85 px-2 py-1 text-[11px] text-text-secondary",
					"data-testid": `${c}-legend`,
					children: d.map((e) => /* @__PURE__ */ Z("li", {
						className: "flex items-center gap-1",
						children: [/* @__PURE__ */ X("span", {
							"aria-hidden": !0,
							className: t("inline-block h-2 w-2 rounded-full", Qe(e, d).bg)
						}), e || "Other"]
					}, e || "(none)"))
				}) : /* @__PURE__ */ X("span", {}), /* @__PURE__ */ X(l, {
					size: "sm",
					"aria-label": "Reset view",
					title: "Reset view",
					disabled: E,
					onClick: () => h(tt),
					className: "pointer-events-auto bg-surface/85",
					"data-testid": `${c}-reset`,
					children: "⟲"
				})]
			}),
			i && D.get(i) && /* @__PURE__ */ Z("span", {
				className: "sr-only",
				"aria-live": "polite",
				children: ["Selected ", D.get(i).label]
			})
		]
	});
}
function rt(e, t) {
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
function it(e) {
	return typeof e == "number" ? at(1 + e * 1.5, 1, 5) : 1.5;
}
function at(e, t, n) {
	return Math.min(n, Math.max(t, e));
}
function ot(e) {
	let t = e.trim().split(/\s+/).filter(Boolean);
	return t.length === 0 ? "" : t.length === 1 ? t[0].slice(0, 2).toUpperCase() : (t[0][0] + t[t.length - 1][0]).toUpperCase();
}
//#endregion
//#region src/components/graph/PeopleGraph.tsx
var st = "__query__";
function ct(e, t) {
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
function lt(e, t) {
	let n = [{
		id: st,
		label: t?.trim() || "Everyone",
		sublabel: `${e.length} ${e.length === 1 ? "person" : "people"}`,
		group: "center"
	}], r = [];
	for (let i of e) {
		let e = ct(i, t);
		n.push({
			id: i.id,
			label: i.name,
			sublabel: i.title,
			group: e,
			weight: i.score,
			avatarUrl: i.avatarUrl
		}), r.push({
			from: st,
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
function ut({ people: e, query: a, onOpenPerson: o, onMessagePerson: c, graphHeight: l = 300, className: u, "data-testid": d = "people-graph" }) {
	let [f, p] = J(null), { nodes: m, edges: h } = K(() => lt(e, a), [e, a]), g = K(() => Ue(m), [m]);
	return e.length === 0 ? /* @__PURE__ */ X(r, {
		density: "compact",
		children: /* @__PURE__ */ X(T, {
			icon: "🕸️",
			title: "No people found",
			body: a ? `Nothing matched “${a}”.` : "There is nobody to show yet.",
			testId: `${d}-empty`,
			className: u
		})
	}) : /* @__PURE__ */ X("div", {
		className: t("@container flex min-h-0 flex-col gap-3 p-3", u),
		"data-testid": d,
		children: /* @__PURE__ */ Z("div", {
			className: "flex min-h-0 flex-col gap-3 @lg:flex-row",
			children: [/* @__PURE__ */ X(nt, {
				nodes: m,
				edges: h,
				layout: "radial",
				height: l,
				selectedId: f,
				onSelect: (e) => p(e.id === "__query__" ? null : e.id),
				className: "@lg:flex-1",
				"data-testid": `${d}-graph`
			}), /* @__PURE__ */ X("ul", {
				className: "flex min-w-0 flex-col gap-2 @lg:w-[260px] @lg:shrink-0",
				"aria-label": "People",
				"data-testid": `${d}-list`,
				children: e.map((e) => {
					let r = ct(e, a), l = e.id === f;
					return /* @__PURE__ */ X("li", { children: /* @__PURE__ */ Z(i, {
						padding: "none",
						className: t("flex cursor-pointer items-center gap-3 p-2", l && "ring-2 ring-primary"),
						onClick: () => p(l ? null : e.id),
						"data-testid": `${d}-row-${e.id}`,
						"data-selected": l || void 0,
						children: [
							/* @__PURE__ */ X("span", {
								className: t("h-2 w-2 shrink-0 rounded-full", Qe(r, g).bg),
								"aria-hidden": !0
							}),
							/* @__PURE__ */ X(M, {
								name: e.name,
								src: e.avatarUrl,
								size: 28
							}),
							/* @__PURE__ */ Z("span", {
								className: "flex min-w-0 flex-1 flex-col",
								children: [
									/* @__PURE__ */ X("span", {
										className: "truncate text-[13px] font-medium text-text-primary",
										children: e.name
									}),
									e.title && /* @__PURE__ */ X("span", {
										className: "truncate text-[11px] text-text-tertiary",
										children: e.title
									}),
									r && /* @__PURE__ */ X("span", {
										className: "mt-0.5",
										children: /* @__PURE__ */ X(s, {
											size: "xs",
											children: r
										})
									})
								]
							}),
							/* @__PURE__ */ Z("span", {
								className: "flex shrink-0 items-center gap-1",
								children: [c && /* @__PURE__ */ X(n, {
									size: "sm",
									variant: "secondary",
									onClick: (t) => {
										t.stopPropagation(), c(e.id);
									},
									"data-testid": `${d}-message-${e.id}`,
									children: "Message"
								}), o && /* @__PURE__ */ X(n, {
									size: "sm",
									variant: "ghost",
									onClick: (t) => {
										t.stopPropagation(), o(e.id);
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
function dt(e) {
	return Array.isArray(e.people);
}
function ft(e) {
	return (t, n) => /* @__PURE__ */ X(pt, {
		panel: t,
		api: n,
		options: e
	});
}
function pt({ panel: e, api: t, options: r }) {
	let { load: i, onOpenPerson: a, onMessagePerson: o, onSelectNode: s, graphHeight: c = 300, "data-testid": l = "graph-panel" } = r, [u, d] = J({ status: "loading" }), [f, p] = J(0), [m, h] = J(null);
	G(() => {
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
	let g = W(() => p((e) => e + 1), []), _ = {
		panel: e,
		api: t
	};
	if (u.status === "loading") return /* @__PURE__ */ Z("div", {
		className: "relative flex flex-col gap-3 p-3",
		"data-testid": `${l}-loading`,
		"aria-busy": "true",
		children: [
			/* @__PURE__ */ X(j, {
				height: c,
				rounded: "lg"
			}),
			/* @__PURE__ */ X(j, { height: 44 }),
			/* @__PURE__ */ X(j, { height: 44 }),
			/* @__PURE__ */ X("div", {
				className: "absolute inset-0 flex items-center justify-center",
				children: /* @__PURE__ */ X(E, {
					size: "md",
					"aria-label": "Loading graph"
				})
			})
		]
	});
	if (u.status === "error") return /* @__PURE__ */ Z("div", {
		className: "flex flex-col gap-2 p-3",
		"data-testid": `${l}-error`,
		children: [/* @__PURE__ */ Z(F, {
			tone: "error",
			children: ["Could not load this graph: ", u.message]
		}), /* @__PURE__ */ X(n, {
			size: "sm",
			variant: "secondary",
			onClick: g,
			className: "self-start",
			"data-testid": `${l}-retry`,
			children: "Try again"
		})]
	});
	let { data: v } = u;
	return dt(v) ? /* @__PURE__ */ X(ut, {
		people: v.people,
		query: v.query ?? e.params?.q ?? e.params?.query,
		graphHeight: c,
		onOpenPerson: a ? (e) => a(e, _) : void 0,
		onMessagePerson: o ? (e) => o(e, _) : void 0,
		"data-testid": `${l}-people`
	}) : /* @__PURE__ */ X("div", {
		className: "p-3",
		"data-testid": `${l}-nodes`,
		children: /* @__PURE__ */ X(nt, {
			nodes: v.nodes,
			edges: v.edges,
			layout: v.layout ?? "force",
			height: c,
			selectedId: m,
			onSelect: (e) => {
				h(e.id), s?.(e, _);
			},
			"data-testid": `${l}-graph`
		})
	});
}
//#endregion
//#region src/components/graph/CanvasZoomControls.tsx
function mt() {
	return /* @__PURE__ */ X("svg", {
		"aria-hidden": "true",
		width: "14",
		height: "14",
		viewBox: "0 0 14 14",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		strokeLinecap: "round",
		children: /* @__PURE__ */ X("path", { d: "M1.5 5 V1.5 H5 M9 1.5 H12.5 V5 M12.5 9 V12.5 H9 M5 12.5 H1.5 V9" })
	});
}
function ht({ zoom: e, onZoomIn: n, onZoomOut: r, onFit: i, minZoom: a, maxZoom: o, className: s, "aria-label": c = "Zoom", "data-testid": u = "canvas-zoom-controls" }) {
	let d = .001, f = e !== void 0 && a !== void 0 && e <= a + d, p = e !== void 0 && o !== void 0 && e >= o - d, m = e !== void 0 && Number.isFinite(e) ? `${Math.round(e * 100)}%` : null;
	return /* @__PURE__ */ Z("div", {
		role: "toolbar",
		"aria-label": c,
		className: t("inline-flex items-center gap-1.5", s),
		"data-testid": u,
		children: [/* @__PURE__ */ Z("div", {
			className: "inline-flex items-center rounded-md border border-border bg-surface",
			children: [
				/* @__PURE__ */ X(l, {
					size: "md",
					"aria-label": "Zoom out",
					onClick: r,
					disabled: f,
					className: "rounded-r-none",
					children: /* @__PURE__ */ X("span", {
						"aria-hidden": "true",
						className: "text-sm leading-none text-text-secondary",
						children: "−"
					})
				}),
				m && /* @__PURE__ */ X("span", {
					className: "min-w-[3.25rem] border-x border-border px-1 text-center text-[12px] tabular-nums text-text-secondary",
					"aria-label": `Zoom ${m}`,
					"data-testid": `${u}-percent`,
					children: m
				}),
				/* @__PURE__ */ X(l, {
					size: "md",
					"aria-label": "Zoom in",
					onClick: n,
					disabled: p,
					className: "rounded-l-none",
					children: /* @__PURE__ */ X("span", {
						"aria-hidden": "true",
						className: "text-sm leading-none text-text-secondary",
						children: "+"
					})
				})
			]
		}), i && /* @__PURE__ */ X(l, {
			size: "md",
			variant: "outline",
			"aria-label": "Fit to view",
			onClick: i,
			children: /* @__PURE__ */ X(mt, {})
		})]
	});
}
//#endregion
//#region src/components/graph/TypedNodeCanvas.tsx
var gt = 224, _t = 168;
function vt(e, t) {
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
function yt(e, t, n = {}) {
	let { layout: r = "ltr", nodeWidth: i = gt, nodeHeight: a = _t, columnGap: o = 144, rowGap: s = 32 } = n, c = /* @__PURE__ */ new Map();
	if (r === "manual") {
		for (let t of e) c.set(t.id, {
			x: t.x ?? 0,
			y: t.y ?? 0
		});
		return c;
	}
	let l = vt(e, t), u = /* @__PURE__ */ new Map();
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
function bt(e, t, n) {
	return t.x >= e.x + n / 2 ? ["r", "l"] : t.x + n / 2 <= e.x ? ["l", "r"] : t.y >= e.y ? ["b", "t"] : ["t", "b"];
}
$.Left, $.Right, $.Top, $.Bottom;
function xt({ data: e }) {
	return /* @__PURE__ */ Z("div", {
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
			/* @__PURE__ */ X(Q, {
				id: "l",
				type: "target",
				position: $.Left,
				isConnectable: !1,
				className: "opacity-0"
			}),
			/* @__PURE__ */ X(Q, {
				id: "t",
				type: "target",
				position: $.Top,
				isConnectable: !1,
				className: "opacity-0"
			}),
			/* @__PURE__ */ X(Q, {
				id: "rt",
				type: "target",
				position: $.Right,
				isConnectable: !1,
				className: "opacity-0"
			}),
			/* @__PURE__ */ X(Q, {
				id: "bt",
				type: "target",
				position: $.Bottom,
				isConnectable: !1,
				className: "opacity-0"
			}),
			e.content,
			/* @__PURE__ */ X(Q, {
				id: "r",
				type: "source",
				position: $.Right,
				isConnectable: !1,
				className: "opacity-0"
			}),
			/* @__PURE__ */ X(Q, {
				id: "b",
				type: "source",
				position: $.Bottom,
				isConnectable: !1,
				className: "opacity-0"
			}),
			/* @__PURE__ */ X(Q, {
				id: "ls",
				type: "source",
				position: $.Left,
				isConnectable: !1,
				className: "opacity-0"
			}),
			/* @__PURE__ */ X(Q, {
				id: "ts",
				type: "source",
				position: $.Top,
				isConnectable: !1,
				className: "opacity-0"
			})
		]
	});
}
function St(e, t, n) {
	switch (n) {
		case $.Left: return `M${e - 7} ${t - 4} L${e} ${t} L${e - 7} ${t + 4} Z`;
		case $.Right: return `M${e + 7} ${t - 4} L${e} ${t} L${e + 7} ${t + 4} Z`;
		case $.Top: return `M${e - 4} ${t - 7} L${e} ${t} L${e + 4} ${t - 7} Z`;
		default: return `M${e - 4} ${t + 7} L${e} ${t} L${e + 4} ${t + 7} Z`;
	}
}
function Ct({ sourceX: e, sourceY: n, targetX: r, targetY: i, sourcePosition: s, targetPosition: l, data: u }) {
	let [d, f, p] = ke({
		sourceX: e,
		sourceY: n,
		targetX: r,
		targetY: i,
		sourcePosition: s,
		targetPosition: l,
		borderRadius: 10
	});
	if (!u) return null;
	let { entity: m, selected: h, reducedMotion: g, onSelect: _ } = u, v = m.tone ? o(m.tone) : "var(--color-primary)", y = !!m.label || m.detail != null || !!m.marker;
	return /* @__PURE__ */ Z("g", {
		"data-edge-id": m.id,
		"data-selected": h ? "true" : "false",
		children: [
			/* @__PURE__ */ X("path", {
				d,
				fill: "none",
				stroke: v,
				strokeWidth: h ? 2.25 : 1.5
			}),
			/* @__PURE__ */ X("path", {
				d: St(r, i, l),
				fill: v
			}),
			/* @__PURE__ */ X("path", {
				d,
				fill: "none",
				stroke: v,
				strokeOpacity: 0,
				strokeWidth: 20,
				className: _ ? "cursor-pointer" : void 0
			}),
			m.animated && !g ? /* @__PURE__ */ X("circle", {
				r: "4",
				fill: v,
				"aria-hidden": "true",
				"data-testid": `typed-edge-motion-${m.id}`,
				children: /* @__PURE__ */ X("animateMotion", {
					dur: "2s",
					repeatCount: "indefinite",
					path: d
				})
			}) : null,
			y ? /* @__PURE__ */ X("foreignObject", {
				x: f - 90,
				y: p - 30,
				width: "180",
				height: "76",
				className: "overflow-visible",
				children: /* @__PURE__ */ Z("div", {
					className: "nodrag nopan pointer-events-none flex h-full flex-col items-center text-center",
					"data-typed-edge-label": m.id,
					children: [
						/* @__PURE__ */ X("span", {
							className: t("h-5 whitespace-nowrap text-[13px] font-medium leading-5", m.tone ? c[m.tone] : "text-primary"),
							children: m.label ?? ""
						}),
						/* @__PURE__ */ X("span", {
							className: "flex h-5 items-center justify-center",
							children: m.marker ? /* @__PURE__ */ X("button", {
								type: "button",
								"aria-label": m.marker.label,
								"aria-pressed": h,
								onClick: (e) => {
									e.stopPropagation(), _?.();
								},
								disabled: !_,
								className: t("pointer-events-auto h-3 w-3 rounded-full border-none p-0 ring-2 ring-surface", a[m.marker.tone ?? m.tone ?? "info"], _ ? "cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" : "cursor-default", h && "outline-2 outline-offset-2 outline-primary"),
								"data-testid": `typed-edge-marker-${m.id}`
							}) : null
						}),
						m.detail != null && /* @__PURE__ */ X("span", {
							className: "text-[12px] leading-4 text-text-tertiary",
							children: m.detail
						})
					]
				})
			}) : null
		]
	});
}
var wt = { typed: xt }, Tt = { typed: Ct };
function Et({ controls: e, caption: t, minZoom: n, maxZoom: r, fitKey: i, reducedMotion: a, userMoved: o }) {
	let s = Ae(), { zoom: c } = Me(), l = a ? 0 : 200, u = W(() => {
		o.current = !1, s.fitView({
			padding: .15,
			maxZoom: 1,
			duration: l
		});
	}, [
		s,
		l,
		o
	]), d = je((e) => e.width), f = je((e) => e.height), p = q(null);
	G(() => {
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
	let m = q(!0);
	return G(() => {
		if (m.current) {
			m.current = !1;
			return;
		}
		let e = typeof requestAnimationFrame == "function" ? requestAnimationFrame(u) : void 0;
		return () => {
			e !== void 0 && typeof cancelAnimationFrame == "function" && cancelAnimationFrame(e);
		};
	}, [i, u]), !e && t == null ? null : /* @__PURE__ */ Z("div", {
		className: "pointer-events-none absolute inset-x-3 bottom-3 z-10 flex items-center gap-4",
		children: [e && /* @__PURE__ */ X(ht, {
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
		}), t != null && /* @__PURE__ */ X("p", {
			className: "m-0 min-w-0 flex-1 truncate text-center text-[12px] text-text-tertiary",
			children: t
		})]
	});
}
function Dt({ nodes: e, edges: n, order: r, selectedId: i, onSelectNode: a, onSelectEdge: o, renderListItem: s, ariaLabel: c, testId: l, className: u }) {
	let d = new Map(e.map((e) => [e.id, e])), f = [...e].sort((e, t) => (r.get(e.id) ?? 0) - (r.get(t.id) ?? 0));
	return /* @__PURE__ */ X("ol", {
		"aria-label": c,
		className: t("m-0 flex list-none flex-col divide-y divide-border p-0", u),
		"data-testid": `${l}-list`,
		children: f.map((e) => {
			let r = i === e.id, c = e.label ?? e.id, u = n.filter((t) => t.from === e.id && d.has(t.to)), f = s ? s(e) : /* @__PURE__ */ Z("span", {
				className: "flex min-w-0 items-baseline gap-2",
				children: [/* @__PURE__ */ X("span", {
					className: "truncate text-[13px] font-medium text-text-primary",
					children: c
				}), /* @__PURE__ */ X("span", {
					className: "text-[12px] text-text-tertiary",
					children: e.kind
				})]
			});
			return /* @__PURE__ */ Z("li", {
				className: t("flex min-w-0 flex-col gap-1 px-3 py-2.5", r && "bg-surface-hover"),
				"data-testid": `${l}-list-node-${e.id}`,
				children: [a ? /* @__PURE__ */ X("button", {
					type: "button",
					"aria-label": c,
					"aria-current": r ? "true" : void 0,
					onClick: () => a(e.id),
					className: "min-w-0 cursor-pointer border-none bg-transparent p-0 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
					children: f
				}) : f, u.length > 0 && /* @__PURE__ */ X("ul", {
					className: "m-0 flex list-none flex-col gap-0.5 p-0 pl-3",
					children: u.map((e) => {
						let t = `${e.label ? `${e.label} ` : ""}→ ${d.get(e.to).label ?? e.to}`;
						return /* @__PURE__ */ Z("li", {
							className: "flex min-w-0 flex-wrap items-baseline gap-x-2 text-[12px] text-text-secondary",
							children: [
								o ? /* @__PURE__ */ X("button", {
									type: "button",
									onClick: () => o(e.id),
									"aria-current": i === e.id ? "true" : void 0,
									className: "cursor-pointer border-none bg-transparent p-0 text-left text-[12px] text-primary hover:underline",
									children: t
								}) : /* @__PURE__ */ X("span", { children: t }),
								e.detail != null && /* @__PURE__ */ X("span", {
									className: "text-text-tertiary",
									children: e.detail
								}),
								e.marker && /* @__PURE__ */ Z("span", {
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
function Ot({ nodes: n, edges: r, renderNode: i, layout: a = "ltr", onSelectNode: o, onSelectEdge: s, selectedId: c = null, listFallback: l = !1, renderListItem: u, nodeWidth: d = gt, nodeHeight: f = _t, columnGap: p = 144, rowGap: m = 32, controls: h = !0, caption: g, minZoom: _ = .3, maxZoom: v = 2, onViewportChange: y, emptyLabel: b = "Nothing to draw yet", className: x, "aria-label": S = "Graph", "data-testid": C = "typed-node-canvas" }) {
	let w = e(), T = q(null), E = q(!1), D = K(() => yt(n, r, {
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
	]), O = K(() => {
		let e = [...n].sort((e, t) => {
			let n = D.get(e.id), r = D.get(t.id);
			return n.x - r.x || n.y - r.y;
		});
		return new Map(e.map((e, t) => [e.id, t]));
	}, [n, D]), k = K(() => new Set(n.map((e) => e.id)), [n]), A = K(() => r.filter((e) => k.has(e.from) && k.has(e.to) && e.from !== e.to), [r, k]), j = K(() => [...k].sort().join("|"), [k]);
	if (n.length === 0) return /* @__PURE__ */ X("div", {
		className: t("flex min-h-40 items-center justify-center text-[13px] text-text-tertiary", x),
		"data-testid": `${C}-empty`,
		children: b
	});
	if (l) return /* @__PURE__ */ X(Dt, {
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
	let ee = [...n].sort((e, t) => O.get(e.id) - O.get(t.id)).map((e) => {
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
	}), M = A.map((e) => {
		let [t, n] = bt(D.get(e.from), D.get(e.to), d), r = t === "r" ? "r" : t === "b" ? "b" : t === "l" ? "ls" : "ts", i = n === "l" ? "l" : n === "t" ? "t" : n === "r" ? "rt" : "bt";
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
	return /* @__PURE__ */ X("div", {
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
		children: /* @__PURE__ */ X(Ee, {
			nodes: ee,
			edges: M,
			nodeTypes: wt,
			edgeTypes: Tt,
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
			children: /* @__PURE__ */ X(Et, {
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
var kt = {
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
function At(e, t) {
	if (!(e !== "waiting" || !t)) return t.reason === "awaiting_approval" ? "Needs approval" : t.step ? `Paused at ${t.step}` : "Paused";
}
function jt({ status: n, sharingFresh: r = !1, label: i, className: a }) {
	let o = e(), s = kt[n], c = i ?? s.label, l = n === "running" && r && !o;
	return /* @__PURE__ */ Z("span", {
		role: "status",
		"aria-label": i ? `${s.label}: ${i}` : s.label,
		"data-status": n,
		"data-sharing-fresh": r ? "true" : "false",
		className: t("inline-flex items-center gap-1.5 whitespace-nowrap text-xs font-medium", s.tone, a),
		children: [/* @__PURE__ */ X("span", {
			"aria-hidden": "true",
			className: t("inline-flex h-4 w-4 items-center justify-center rounded-full border border-current text-[10px] leading-none", l && "animate-pulse"),
			children: s.icon
		}), /* @__PURE__ */ X("span", { children: c })]
	});
}
//#endregion
//#region src/components/graph/work/WorkNode.tsx
var Mt = {
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
}, Nt = {
	terminal: "observe-terminal",
	document: "view-document",
	conversation: "join-conversation",
	meeting: "join-meeting",
	transcript: "view-transcript",
	run: "view-run"
}, Pt = {
	terminal: "Observe",
	document: "View",
	conversation: "Open chat",
	meeting: "Join",
	transcript: "View",
	run: "View"
};
function Ft(e) {
	if (!e) return null;
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? null : t.toLocaleString(void 0, {
		dateStyle: "medium",
		timeStyle: "short"
	});
}
function It(e) {
	return e.locked ? "Restricted work item" : e.title.trim() || `${Mt[e.kind]} (untitled)`;
}
function Lt({ node: e, selected: r = !1, sharingFresh: i = !1, onSelect: a, onOpen: o }) {
	let s = It(e), c = Nt[e.kind], l = c !== void 0 && e.capabilities.includes(c), u = Pt[e.kind] ?? "Open", d = Ft(e.updatedAt), f = Ft(e.startedAt), p = Ft(e.endedAt), m = () => a?.(e.id);
	return /* @__PURE__ */ Z("article", {
		role: "group",
		tabIndex: 0,
		"aria-label": `${Mt[e.kind]}: ${s}`,
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
			/* @__PURE__ */ Z("div", {
				className: "flex min-w-0 items-start gap-2",
				children: [
					/* @__PURE__ */ X(M, {
						name: e.locked ? "Restricted work item" : s,
						...!e.locked && e.avatarUrl ? { src: e.avatarUrl } : {},
						size: 32
					}),
					/* @__PURE__ */ Z("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ X("div", {
							className: "mb-1 text-[11px] font-medium uppercase tracking-wide text-text-tertiary",
							children: Mt[e.kind]
						}), /* @__PURE__ */ X("h3", {
							className: "break-words line-clamp-2 text-sm font-semibold text-text-primary",
							"data-testid": "work-node-title",
							children: s
						})]
					}),
					r && /* @__PURE__ */ X("span", {
						className: "sr-only",
						children: "Selected"
					})
				]
			}),
			e.kind === "conversation" && e.status === "completed" ? /* @__PURE__ */ X("span", {
				role: "status",
				className: "text-xs font-medium text-text-secondary",
				children: "Recent activity"
			}) : /* @__PURE__ */ X(jt, {
				status: e.status,
				sharingFresh: i
			}),
			!e.locked && e.description && /* @__PURE__ */ X("p", {
				className: "break-words line-clamp-3 text-xs text-text-secondary",
				children: e.description
			}),
			/* @__PURE__ */ Z("dl", {
				className: "grid min-w-0 gap-1 text-[11px] text-text-tertiary",
				children: [
					f && /* @__PURE__ */ Z("div", { children: [/* @__PURE__ */ X("dt", {
						className: "inline font-medium",
						children: e.kind === "conversation" ? "First activity: " : "Started: "
					}), /* @__PURE__ */ X("dd", {
						className: "inline",
						children: f
					})] }),
					/* @__PURE__ */ Z("div", { children: [/* @__PURE__ */ X("dt", {
						className: "inline font-medium",
						children: e.kind === "conversation" ? "Last activity: " : "Updated: "
					}), /* @__PURE__ */ X("dd", {
						className: "inline",
						children: d ?? "Unknown"
					})] }),
					p && /* @__PURE__ */ Z("div", { children: [/* @__PURE__ */ X("dt", {
						className: "inline font-medium",
						children: "Ended: "
					}), /* @__PURE__ */ X("dd", {
						className: "inline",
						children: p
					})] })
				]
			}),
			l && c && /* @__PURE__ */ X(n, {
				size: "sm",
				variant: "secondary",
				disabled: !l || !o,
				"data-capability": c,
				"aria-label": `${u} ${Mt[e.kind].toLowerCase()}`,
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
var Rt = {
	"works-on": "Works on",
	"runs-in": "Runs in",
	"operates-on": "Operates on",
	produced: "Produced",
	edited: "Edited",
	attended: "Attended",
	discussed: "Discussed",
	"derived-from": "Derived from"
};
function zt({ edge: e, selected: n = !1, reducedMotion: r = !1, fromLabel: i, toLabel: a, onSelect: o }) {
	let s = Rt[e.relation], c = e.disclosure === "existence", l = c ? "Shared connection" : e.label?.trim() || s;
	return /* @__PURE__ */ Z("button", {
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
			/* @__PURE__ */ X("span", {
				"aria-hidden": "true",
				className: t("h-px min-w-4 flex-1 bg-border", n ? "bg-primary" : "group-hover:bg-primary/50")
			}),
			/* @__PURE__ */ Z("span", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ X("span", {
					className: "block truncate text-xs font-medium text-text-primary",
					children: l
				}), /* @__PURE__ */ Z("span", {
					className: "block truncate text-[11px] text-text-tertiary",
					children: [
						i,
						" → ",
						a
					]
				})]
			}),
			/* @__PURE__ */ X(jt, { status: e.status }),
			/* @__PURE__ */ X("span", {
				"aria-hidden": "true",
				className: t("h-px min-w-4 flex-1 bg-border", n ? "bg-primary" : "group-hover:bg-primary/50")
			}),
			n && /* @__PURE__ */ X("span", {
				className: "sr-only",
				children: "Selected"
			})
		]
	});
}
//#endregion
//#region src/components/graph/work/WorkEntityList.tsx
function Bt(e, t, n) {
	return e?.kind === t && e.id === n;
}
function Vt(e) {
	return e.locked ? "Restricted work item" : e.title.trim() || "Untitled work item";
}
function Ht(e, t) {
	let n = t.get(e.fromId), r = t.get(e.toId), i = n ? Vt(n) : "Unavailable item", a = r ? Vt(r) : "Unavailable item";
	return e.label?.trim() || `${i} ${e.relation} ${a}`;
}
var Ut = (e) => t("w-full rounded-md border px-3 py-2 text-left text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50", e ? "border-primary bg-primary/10 ring-1 ring-primary" : "border-border hover:bg-surface-hover");
function Wt({ nodes: e, edges: t, selection: n, onSelectionChange: r, heading: i = "Accessible work graph", groups: a, footer: o, statusLabelOf: s }) {
	let c = new Map(e.map((e) => [e.id, e])), l = q(null), u = n ? `${n.kind}:${n.id}` : null;
	G(() => {
		u && l.current?.scrollIntoView?.({ block: "nearest" });
	}, [u]);
	let d = (e) => {
		let t = Bt(n, "node", e.id);
		return /* @__PURE__ */ X("li", { children: /* @__PURE__ */ Z("button", {
			ref: t ? l : void 0,
			type: "button",
			"aria-label": `Work item: ${Vt(e)}`,
			"aria-pressed": t,
			"aria-current": t ? "true" : void 0,
			"data-selected": t || void 0,
			onClick: () => r({
				kind: "node",
				id: e.id
			}),
			className: Ut(t),
			children: [/* @__PURE__ */ X("span", {
				className: "block break-words font-medium text-text-primary",
				children: Vt(e)
			}), /* @__PURE__ */ X("span", {
				className: "text-xs text-text-tertiary",
				children: e.kind === "conversation" ? "Chat · Recent activity" : `${e.kind} · ${s?.(e) ?? e.status}`
			})]
		}) }, e.id);
	}, f = a?.map((e) => ({
		...e,
		items: e.nodeIds.map((e) => c.get(e)).filter((e) => !!e)
	})).filter((e) => e.items.length > 0), p = f ? f.length === 0 && t.length === 0 : e.length === 0 && t.length === 0;
	return /* @__PURE__ */ Z("section", {
		"aria-labelledby": "work-entity-list-heading",
		className: "min-w-0 space-y-3",
		children: [
			/* @__PURE__ */ X("h3", {
				id: "work-entity-list-heading",
				className: "text-sm font-semibold text-text-primary",
				children: i
			}),
			p ? /* @__PURE__ */ X("p", {
				className: "text-sm text-text-secondary",
				children: "No shared work is available."
			}) : /* @__PURE__ */ Z("div", {
				className: "grid gap-3 md:grid-cols-2",
				children: [/* @__PURE__ */ Z("div", { children: [/* @__PURE__ */ X("h4", {
					className: "mb-1 text-xs font-medium uppercase tracking-wide text-text-tertiary",
					children: "Items"
				}), f ? f.map((e) => /* @__PURE__ */ Z("section", {
					"aria-label": e.title,
					className: "mb-2",
					"data-testid": "work-entity-list-group",
					children: [/* @__PURE__ */ Z("h5", {
						className: "mb-1 truncate text-xs font-semibold text-text-secondary",
						children: [e.title, e.subtitle && /* @__PURE__ */ Z("span", {
							className: "font-normal text-text-tertiary",
							children: [" · ", e.subtitle]
						})]
					}), /* @__PURE__ */ X("ul", {
						className: "space-y-1",
						children: e.items.map(d)
					})]
				}, e.id)) : /* @__PURE__ */ X("ul", {
					className: "space-y-1",
					children: e.map(d)
				})] }), /* @__PURE__ */ Z("div", { children: [/* @__PURE__ */ X("h4", {
					className: "mb-1 text-xs font-medium uppercase tracking-wide text-text-tertiary",
					children: "Relationships"
				}), /* @__PURE__ */ X("ul", {
					className: "space-y-1",
					children: t.map((e) => {
						let t = Bt(n, "edge", e.id), i = Ht(e, c);
						return /* @__PURE__ */ X("li", { children: /* @__PURE__ */ Z("button", {
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
							className: Ut(t),
							children: [/* @__PURE__ */ X("span", {
								className: "block break-words font-medium text-text-primary",
								children: i
							}), /* @__PURE__ */ Z("span", {
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
var Gt = {
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
}, Kt = /* @__PURE__ */ new Set([
	"view-document",
	"edit-document",
	"join-conversation",
	"join-meeting",
	"observe-terminal",
	"control-terminal",
	"view-transcript",
	"view-run"
]);
function qt(e, t, n) {
	if (n) return n.kind === "node" ? e.find((e) => e.id === n.id) : t.find((e) => e.id === n.id);
}
function Jt(e) {
	return "kind" in e ? e.locked ? "Restricted work item" : e.title : e.label?.trim() || `${e.relation} relationship`;
}
function Yt({ nodes: e, edges: t, selection: r, onSelectionChange: i, onOpen: a, onReference: o, onRequestCollaboration: s }) {
	let c = qt(e, t, r);
	if (G(() => {
		r && !c && i(null);
	}, [
		c,
		i,
		r
	]), !r || !c) return /* @__PURE__ */ X("aside", {
		"aria-label": "Work details",
		className: "rounded-lg border border-border bg-surface p-4",
		children: /* @__PURE__ */ X("p", {
			className: "text-sm text-text-secondary",
			children: "Select a work item or relationship to inspect it."
		})
	});
	let l = r, u = c.capabilities.find((e) => Kt.has(e));
	return /* @__PURE__ */ Z("aside", {
		"aria-label": "Work details",
		className: "space-y-4 rounded-lg border border-border bg-surface p-4",
		children: [
			/* @__PURE__ */ Z("div", {
				className: "min-w-0",
				children: [
					/* @__PURE__ */ X("p", {
						className: "text-xs font-medium uppercase tracking-wide text-text-tertiary",
						children: "kind" in c ? c.kind : "Relationship"
					}),
					/* @__PURE__ */ X("h3", {
						className: "break-words text-base font-semibold text-text-primary",
						children: Jt(c)
					}),
					/* @__PURE__ */ X("p", {
						className: "text-sm text-text-secondary",
						children: c.status
					}),
					"description" in c && !c.locked && c.description ? /* @__PURE__ */ X("p", {
						className: "mt-2 break-words text-sm text-text-secondary",
						children: c.description
					}) : null
				]
			}),
			/* @__PURE__ */ Z("div", {
				className: "flex flex-wrap gap-2",
				children: [u && a ? /* @__PURE__ */ X(n, {
					size: "sm",
					variant: "secondary",
					onClick: () => a(l),
					children: "Open"
				}) : null, o ? /* @__PURE__ */ X(n, {
					size: "sm",
					variant: "secondary",
					onClick: () => o(l),
					children: "Reference"
				}) : null]
			}),
			c.capabilities.length > 0 && s ? /* @__PURE__ */ Z("div", { children: [/* @__PURE__ */ X("h4", {
				className: "mb-2 text-xs font-medium uppercase tracking-wide text-text-tertiary",
				children: "Request collaboration"
			}), /* @__PURE__ */ X("div", {
				className: "flex flex-wrap gap-2",
				children: c.capabilities.map((e) => /* @__PURE__ */ X(n, {
					size: "sm",
					variant: "secondary",
					onClick: () => s(l, e),
					children: Gt[e]
				}, e))
			})] }) : null
		]
	});
}
//#endregion
//#region src/components/graph/work/WorkSharingControls.tsx
var Xt = [
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
function Zt(e) {
	return e.locked ? "Restricted work item" : e.title.trim() || "Untitled work item";
}
function Qt(e) {
	return e.label?.trim() || `${e.relation} relationship`;
}
function $t(e, t, n, r) {
	let i = e[t];
	return {
		...e,
		[t]: r ? i.includes(n) ? i : [...i, n] : i.filter((e) => e !== n)
	};
}
function en(e) {
	return e.audience.kind === "organization" ? ["Everyone in your organization"] : e.audience.kind === "people" ? e.audience.personIds : e.audience.conversationIds;
}
var tn = 8;
function nn({ legend: e, empty: t, saving: n, idPrefix: r, items: i, selected: a, onToggle: o }) {
	let [s, c] = J(""), l = s.trim().toLowerCase(), u = l ? i.filter((e) => `${e.label} ${e.meta}`.toLowerCase().includes(l)) : i, d = i.filter((e) => a.includes(e.id)).length;
	return /* @__PURE__ */ Z("fieldset", {
		disabled: n,
		className: "space-y-2",
		"data-testid": `work-sharing-${e.toLowerCase().replace(/\s+/g, "-")}`,
		children: [/* @__PURE__ */ Z("legend", {
			className: "text-sm font-semibold text-text-primary",
			children: [e, i.length > 0 && /* @__PURE__ */ Z("span", {
				className: "ml-2 text-xs font-normal text-text-tertiary",
				children: [
					d,
					" of ",
					i.length,
					" selected"
				]
			})]
		}), i.length === 0 ? /* @__PURE__ */ X("p", {
			className: "text-sm text-text-secondary",
			children: t
		}) : /* @__PURE__ */ Z(Y, { children: [i.length > tn && /* @__PURE__ */ X(S, {
			type: "search",
			value: s,
			placeholder: `Filter ${e.toLowerCase()}`,
			"aria-label": `Filter ${e.toLowerCase()}`,
			onChange: (e) => c(e.target.value)
		}), /* @__PURE__ */ Z("div", {
			className: "max-h-72 space-y-2 overflow-y-auto pr-1",
			"data-testid": "work-sharing-checklist",
			children: [u.length === 0 && /* @__PURE__ */ X("p", {
				className: "text-sm text-text-secondary",
				children: "Nothing matches."
			}), u.map((e) => {
				let t = `${r}-${e.id}`;
				return /* @__PURE__ */ Z("label", {
					htmlFor: t,
					className: "flex items-start gap-2 rounded-md border border-border px-3 py-2 text-sm text-text-primary",
					children: [/* @__PURE__ */ X(le, {
						id: t,
						checked: a.includes(e.id),
						disabled: n,
						onChange: (t) => o(e.id, t)
					}), /* @__PURE__ */ Z("span", {
						className: "min-w-0 break-words",
						children: [/* @__PURE__ */ X("span", {
							className: "block font-medium",
							children: e.label
						}), /* @__PURE__ */ X("span", {
							className: "text-xs text-text-tertiary",
							children: e.meta
						})]
					})]
				}, e.id);
			})]
		})] })]
	});
}
function rn({ state: e, value: t, availableNodes: r, availableEdges: i, saving: a = !1, error: o, conflict: s = !1, onChange: c, onStart: l, onPause: u, onResume: d, onStop: f }) {
	let p = ye(), m = en(t), h = e === "off" ? "Off" : e.charAt(0).toUpperCase() + e.slice(1);
	return /* @__PURE__ */ Z("section", {
		"aria-labelledby": "work-sharing-heading",
		className: "space-y-5 rounded-lg border border-border bg-surface p-4",
		children: [
			/* @__PURE__ */ Z("div", {
				className: "flex flex-wrap items-start justify-between gap-3",
				children: [/* @__PURE__ */ Z("div", { children: [/* @__PURE__ */ X("h3", {
					id: "work-sharing-heading",
					className: "text-base font-semibold text-text-primary",
					children: "Share work activity"
				}), /* @__PURE__ */ X("p", {
					className: "mt-1 text-sm text-text-secondary",
					children: "Sharing is voluntary. Only the audience, work, relationships, and detail selected here are shared."
				})] }), /* @__PURE__ */ X("span", {
					className: "rounded-full border border-border bg-surface-inset px-2.5 py-1 text-xs font-medium text-text-secondary",
					children: h
				})]
			}),
			o ? /* @__PURE__ */ X(F, {
				tone: "error",
				children: o
			}) : null,
			s ? /* @__PURE__ */ X(F, {
				tone: "warning",
				children: "Sharing changed elsewhere. Review the current settings before trying again."
			}) : null,
			a ? /* @__PURE__ */ X("p", {
				role: "status",
				"aria-live": "polite",
				className: "text-sm text-text-secondary",
				children: "Saving sharing settings…"
			}) : null,
			/* @__PURE__ */ Z("fieldset", {
				disabled: a,
				className: "space-y-2",
				children: [
					/* @__PURE__ */ X("legend", {
						className: "text-sm font-semibold text-text-primary",
						children: "Audience"
					}),
					/* @__PURE__ */ X("p", {
						className: "text-xs text-text-tertiary",
						children: t.audience.kind === "people" ? "Selected people" : t.audience.kind === "conversation" ? "Selected conversations" : "Organization"
					}),
					m.length > 0 ? /* @__PURE__ */ X("ul", {
						"aria-label": "Current sharing audience",
						className: "flex flex-wrap gap-2",
						children: m.map((e) => /* @__PURE__ */ X("li", {
							className: "max-w-full break-all rounded-md border border-border bg-surface-inset px-2 py-1 text-xs text-text-secondary",
							children: e
						}, e))
					}) : /* @__PURE__ */ X("p", {
						className: "text-sm text-text-secondary",
						children: "No audience selected."
					}),
					/* @__PURE__ */ X("p", {
						className: "text-xs text-text-tertiary",
						children: "Audience choices are provided by the host application."
					})
				]
			}),
			/* @__PURE__ */ X(nn, {
				legend: "Work items",
				empty: "No work items are available.",
				saving: a,
				idPrefix: `${p}-node`,
				items: r.map((e) => ({
					id: e.id,
					label: Zt(e),
					meta: e.kind
				})),
				selected: t.selectedNodeIds,
				onToggle: (e, n) => c($t(t, "selectedNodeIds", e, n))
			}),
			/* @__PURE__ */ X(nn, {
				legend: "Relationships",
				empty: "No relationships are available.",
				saving: a,
				idPrefix: `${p}-edge`,
				items: i.map((e) => ({
					id: e.id,
					label: Qt(e),
					meta: e.relation
				})),
				selected: t.selectedEdgeIds,
				onToggle: (e, n) => c($t(t, "selectedEdgeIds", e, n))
			}),
			/* @__PURE__ */ Z("div", {
				className: "grid gap-4 sm:grid-cols-2",
				children: [/* @__PURE__ */ Z("div", {
					className: "flex flex-col gap-1 text-sm font-medium text-text-primary",
					children: [/* @__PURE__ */ X("label", {
						htmlFor: `${p}-disclosure`,
						children: "Detail shared"
					}), /* @__PURE__ */ X(C, {
						id: `${p}-disclosure`,
						size: "md",
						value: t.disclosure,
						disabled: a,
						onChange: (e) => c({
							...t,
							disclosure: e.target.value
						}),
						options: Xt.map((e) => ({
							value: e.value,
							label: e.label
						}))
					})]
				}), /* @__PURE__ */ Z("label", {
					className: "space-y-1 text-sm font-medium text-text-primary",
					children: [/* @__PURE__ */ X("span", { children: "Live sharing expires" }), /* @__PURE__ */ X(S, {
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
			/* @__PURE__ */ Z("fieldset", {
				disabled: a,
				className: "space-y-3 rounded-md border border-border p-3",
				children: [
					/* @__PURE__ */ X("legend", {
						className: "px-1 text-sm font-semibold text-text-primary",
						children: "Earlier work"
					}),
					/* @__PURE__ */ Z("label", {
						htmlFor: `${p}-history`,
						className: "flex items-start gap-2 text-sm text-text-primary",
						children: [/* @__PURE__ */ X(le, {
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
						}), /* @__PURE__ */ Z("span", { children: [/* @__PURE__ */ X("span", {
							className: "block font-medium",
							children: "Share selected history"
						}), /* @__PURE__ */ X("span", {
							className: "block text-xs text-text-tertiary",
							children: "Historical work is never included unless you select this option."
						})] })]
					}),
					t.history ? /* @__PURE__ */ Z("div", {
						className: "grid gap-3 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ Z("label", {
								className: "space-y-1 text-sm font-medium text-text-primary",
								children: [/* @__PURE__ */ X("span", { children: "First day" }), /* @__PURE__ */ X(S, {
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
							/* @__PURE__ */ Z("label", {
								className: "space-y-1 text-sm font-medium text-text-primary",
								children: [/* @__PURE__ */ X("span", { children: "Last day" }), /* @__PURE__ */ X(S, {
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
							/* @__PURE__ */ Z("label", {
								className: "space-y-1 text-sm font-medium text-text-primary",
								children: [/* @__PURE__ */ X("span", { children: "History access expires" }), /* @__PURE__ */ X(S, {
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
			/* @__PURE__ */ Z("div", {
				className: "flex flex-wrap gap-2",
				children: [
					e === "off" || e === "stopped" || e === "expired" ? /* @__PURE__ */ X(n, {
						disabled: a,
						onClick: l,
						children: e === "off" ? "Start sharing" : "Start sharing again"
					}) : null,
					e === "active" ? /* @__PURE__ */ X(n, {
						variant: "secondary",
						disabled: a,
						onClick: u,
						children: "Pause sharing"
					}) : null,
					e === "paused" ? /* @__PURE__ */ X(n, {
						disabled: a,
						onClick: d,
						children: "Resume sharing"
					}) : null,
					e === "active" || e === "paused" ? /* @__PURE__ */ X(n, {
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
var an = /* @__PURE__ */ new Set([
	"view-document",
	"edit-document",
	"join-conversation",
	"join-meeting",
	"observe-terminal",
	"control-terminal",
	"view-transcript",
	"view-run"
]);
function on({ target: e, state: t, node: r, edge: i, unavailableLabel: a, onSelect: o, onOpen: s }) {
	let c = e?.kind === "node" ? r : e?.kind === "edge" ? i : void 0;
	if (t === "loading") return /* @__PURE__ */ X("article", {
		"aria-label": "Shared work reference",
		"aria-busy": "true",
		className: "rounded-lg border border-border bg-surface p-3",
		children: /* @__PURE__ */ X("p", {
			role: "status",
			className: "text-sm text-text-secondary",
			children: "Loading shared work…"
		})
	});
	if (t === "unavailable" || !e || !c) return /* @__PURE__ */ X("article", {
		"aria-label": "Shared work reference",
		className: "rounded-lg border border-border bg-surface p-3",
		children: /* @__PURE__ */ X("p", {
			className: "text-sm text-text-secondary",
			children: a ?? "This work item is unavailable."
		})
	});
	let l = e.kind === "node" ? r?.locked ? "Restricted work item" : r?.title : i?.label?.trim() || `${i?.relation ?? "Shared"} relationship`, u = (e.kind === "node" ? r?.capabilities ?? [] : i?.capabilities ?? []).some((e) => an.has(e)), d = e;
	return /* @__PURE__ */ Z("article", {
		"aria-label": "Shared work reference",
		className: "space-y-3 rounded-lg border border-border bg-surface p-3",
		children: [/* @__PURE__ */ Z("button", {
			type: "button",
			"aria-label": `Select reference: ${l}`,
			disabled: !o,
			onClick: () => o?.(d),
			className: "block w-full rounded text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:cursor-default",
			children: [
				/* @__PURE__ */ X("span", {
					className: "block text-xs font-medium uppercase tracking-wide text-text-tertiary",
					children: e.kind === "node" ? r?.kind : "Relationship"
				}),
				/* @__PURE__ */ X("span", {
					className: "block break-words text-sm font-semibold text-text-primary",
					children: l
				}),
				/* @__PURE__ */ X("span", {
					className: "block text-xs text-text-secondary",
					children: c.status
				})
			]
		}), u && s ? /* @__PURE__ */ X(n, {
			size: "sm",
			variant: "secondary",
			onClick: () => s(d),
			children: "Open shared work"
		}) : null]
	});
}
//#endregion
//#region src/components/graph/work/WorkActivityTimeline.tsx
function sn(e, t) {
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
function cn(e, t, n, r, i) {
	let a = t.updatedAt || t.startedAt;
	if (!a) return null;
	let o = new Date(a);
	if (Number.isNaN(o.getTime())) return null;
	let s = sn(o, i);
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
function ln({ day: e, timezone: t, nodes: n, edges: r, selection: i, onSelectionChange: a }) {
	let [o, s] = J(() => /* @__PURE__ */ new Date());
	G(() => {
		let e = window.setInterval(() => s(/* @__PURE__ */ new Date()), 6e4);
		return () => window.clearInterval(e);
	}, []);
	let c = K(() => {
		let i = new Map(n.map((e) => [e.id, e.locked ? "Restricted work item" : e.title.trim() || "Untitled work item"]));
		return [...n.map((n) => cn("node", n, i.get(n.id), e, t)), ...r.map((n) => cn("edge", n, `${i.get(n.fromId) ?? "Work item"} → ${i.get(n.toId) ?? "Work item"}`, e, t))].filter((e) => e !== null).sort((e, t) => e.minute - t.minute || e.key.localeCompare(t.key));
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
	let u = sn(o, t), d = u.day === e;
	return /* @__PURE__ */ Z("div", {
		className: "rounded-lg border border-border bg-surface px-4 py-3",
		"aria-label": `Activity on ${e}`,
		"data-testid": "work-activity-timeline",
		children: [
			/* @__PURE__ */ Z("div", {
				className: "mb-3 flex items-baseline justify-between gap-3",
				children: [/* @__PURE__ */ Z("div", { children: [/* @__PURE__ */ X("h2", {
					className: "text-sm font-semibold text-text-primary",
					children: "Activity over the day"
				}), /* @__PURE__ */ X("p", {
					className: "text-xs text-text-secondary",
					children: "Select a time to inspect visible work and its branches."
				})] }), /* @__PURE__ */ X("span", {
					className: "shrink-0 text-xs text-text-secondary",
					children: t
				})]
			}),
			/* @__PURE__ */ Z("div", {
				className: "relative h-10 border-b border-border",
				children: [
					[
						0,
						6,
						12,
						18,
						24
					].map((e) => /* @__PURE__ */ X("span", {
						"aria-hidden": "true",
						className: "absolute bottom-0 h-2 border-l border-border",
						style: { left: `${e / 24 * 100}%` }
					}, e)),
					Array.from(l, ([e, t]) => {
						let n = t.some((e) => i?.kind === e.selection.kind && i.id === e.selection.id), r = t.some((e) => e.live);
						return /* @__PURE__ */ X("button", {
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
					d ? /* @__PURE__ */ X("span", {
						"aria-hidden": "true",
						className: "pointer-events-none absolute bottom-0 top-0 border-l-2 border-primary",
						style: { left: `${u.minute / 1440 * 100}%` }
					}) : null
				]
			}),
			/* @__PURE__ */ Z("div", {
				className: "mt-1 flex justify-between text-[11px] text-text-secondary",
				"aria-hidden": "true",
				children: [
					/* @__PURE__ */ X("span", { children: "12 AM" }),
					/* @__PURE__ */ X("span", { children: "6 AM" }),
					/* @__PURE__ */ X("span", { children: "12 PM" }),
					/* @__PURE__ */ X("span", { children: "6 PM" }),
					/* @__PURE__ */ X("span", { children: "12 AM" })
				]
			}),
			/* @__PURE__ */ Z("p", {
				className: "mt-2 text-xs text-text-secondary",
				children: [c.length === 0 ? "No visible activity recorded for this day." : `${c.length} visible work ${c.length === 1 ? "item" : "items"} across ${l.size} ${l.size === 1 ? "hour" : "hours"}.`, d ? ` Now ${u.time}.` : ""]
			}),
			c.length > 0 ? /* @__PURE__ */ Z("details", {
				className: "mt-2 text-xs",
				children: [/* @__PURE__ */ X("summary", {
					className: "cursor-pointer text-primary",
					children: "Browse activity"
				}), /* @__PURE__ */ X("ol", {
					className: "mt-2 max-h-36 space-y-1 overflow-y-auto",
					children: c.map((e) => /* @__PURE__ */ X("li", { children: /* @__PURE__ */ Z("button", {
						type: "button",
						className: `w-full rounded px-2 py-1 text-left hover:bg-surface-hover ${i?.kind === e.selection.kind && i.id === e.selection.id ? "font-semibold text-primary" : "text-text-primary"}`,
						onClick: () => a(e.selection),
						"aria-current": i?.kind === e.selection.kind && i.id === e.selection.id ? "true" : void 0,
						children: [
							/* @__PURE__ */ X("time", { children: e.time }),
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
var un = .4, dn = .1, fn = un, pn = .8, mn = 2, hn = 0, gn = (e, t, n) => JSON.stringify([
	e,
	t,
	n
]);
function _n(e) {
	if (!e) return 0;
	let t = Date.parse(e);
	return Number.isNaN(t) ? 0 : t;
}
var vn = /* @__PURE__ */ new Set(["document"]);
function yn(e, t, n = {}) {
	let r = n.max ?? 2;
	if (!Number.isFinite(r) || r <= 0 || e.length <= r) return [...e];
	let i = new Map(t.map((e) => [e.id, Math.max(_n(e.updatedAt), _n(e.startedAt))])), a = e.map((e, t) => ({
		index: t,
		recency: Math.max(0, ...e.nodeIds.map((e) => i.get(e) ?? 0))
	})).sort((e, t) => t.recency - e.recency || e.index - t.index), o = a.slice(0, r), s = new Map(t.map((e) => [e.id, e.kind])), c = (t) => e[t].nodeIds.some((e) => vn.has(s.get(e)));
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
function bn(e, t, n, r) {
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
		let j = Math.max(w.length, ...[...k.values()].map((e) => e + 1), 1), ee = r.labelledEdgeIds?.some((e) => m.some((t) => t.id === e && k.has(t.from))) ? 132 : 56, M = T.length ? Math.max(...T.map((e) => x(e).width)) : 0, N = c + (M ? M + ee : 0), P = (e) => [...w.filter((t) => E.get(t) === e), ...[...k].filter(([, t]) => t === e).map(([e]) => e)], te = [...Array(j).keys()].map((e) => Math.max(0, ...P(e).map((e) => x(e).height))), F = [...Array(j).keys()].map((e) => 32 + Math.max(1, ...P(e).map((e) => m.filter((t) => t.to === e).length)) * 24), I = te.reduce((e, t, n) => e + t + (n ? F[n] : 0), 56 + c), L = T.length === 0 && r.height && I > r.height && j > 2 ? te.reduce((e, t, n) => {
			let r = e.run + t + (n ? F[n] : 0);
			return r < I / 2 ? {
				row: n + 1,
				run: r
			} : e;
		}, {
			row: 0,
			run: 56
		}).row || Math.ceil(j / 2) : j, ne = (e) => e < L ? 0 : 1, R = te.reduce((e, t, n) => [...e, n === 0 || ne(n) !== ne(n - 1) ? 56 : e[n - 1] + te[n - 1] + F[n]], []), re = Math.max(0, ...w.map((e) => x(e).width)), z = (e) => N + ne(e) * (re + Math.max(96, ee)), ie = [];
		for (let t of w) ie.push({
			id: gn(e.id, "node", t),
			entityId: t,
			x: z(E.get(t)),
			y: R[E.get(t)],
			...x(t)
		});
		for (let [t, n] of k) ie.push({
			id: gn(e.id, "node", t),
			entityId: t,
			x: c,
			y: R[n],
			...x(t)
		});
		let B = T.length === 0, ae = new Map(ie.map((e) => [e.entityId, e])), oe = /* @__PURE__ */ new Map();
		p.push({
			id: e.id,
			title: e.title,
			subtitle: e.subtitle,
			x: 0,
			y: 0,
			width: Math.max(...ie.map((e) => e.x + e.width)) + c,
			height: Math.max(...ie.map((e) => e.y + e.height)) + c,
			collapsedSourceCount: t.length - u.length,
			sourceCount: l.size,
			vertical: B,
			cyclicNodeIds: y,
			nodes: ie,
			edges: m.map((t) => {
				let n = oe.get(t.to) ?? 0;
				oe.set(t.to, n + 1);
				let r = ae.get(t.from), i = ae.get(t.to), a = r.x !== i.x, o = a ? "out-right" : "out-bottom", s = a ? "in-left" : "in-top";
				return {
					id: gn(e.id, "edge", t.id),
					entityId: t.id,
					source: gn(e.id, "node", t.from),
					target: gn(e.id, "node", t.to),
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
		if (i.length) return bn(e, t, n, {
			...r,
			foldedForHeight: [...r.foldedForHeight ?? [], ...i.map((e) => e.id)]
		});
	}
	for (let [e, t] of p.entries()) t.x = _.places[e].x, t.y = _.places[e].y;
	return p;
}
//#endregion
//#region src/components/graph/work/workKinds.ts
var xn = {
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
}, Sn = {
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
}, Cn = {
	project: "Project",
	task: "Task",
	run: "Run",
	agent: "Agent",
	change: "Change",
	document: "Document",
	conversation: "Conversation",
	meeting: "Meeting",
	transcript: "Transcript",
	terminal: "Terminal"
};
function wn(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e) t.set(n.kind, (t.get(n.kind) ?? 0) + 1);
	return Object.keys(Cn).filter((e) => t.has(e)).map((e) => ({
		kind: e,
		count: t.get(e)
	}));
}
//#endregion
//#region src/components/graph/work/WorkActivityNode.tsx
var Tn = "flex items-center justify-center [&>*]:h-full [&>*]:w-full [&_img]:h-full [&_img]:w-full [&_img]:object-contain [&_svg]:h-full [&_svg]:w-full", En = {
	idle: "bg-border-emphasis",
	running: "bg-info",
	waiting: "bg-caution",
	completed: "bg-success",
	error: "bg-danger",
	stopped: "bg-border-emphasis",
	stale: "bg-border-emphasis"
};
function Dn({ node: e, detail: n, selected: r, selectedRevisionId: i, live: a, onSelect: o, onFeedback: s }) {
	let c = e.locked || e.disclosure === "existence" ? void 0 : n, u = i ? c?.artifact?.revisions.find((e) => e.id === i) : c?.artifact?.revisions.at(-1), f = c?.artifact?.pending, p = e.locked ? "Restricted work item" : e.title, m = a && c?.fresh === !0, h = c?.emphasis === "earlier" || c?.emphasis === "input", g = f?.status === "generating", _ = !!c?.artifact?.revisions.length && e.status !== "running" && !g, v = Sn[e.kind], y = e.status === "error", b = c?.emphasis === "current" || !h && e.status === "running" && m, x = e.status === "running" && a && !m, S = At(e.status, c?.pause), C = x ? "Running · updates delayed" : S ?? e.status, w = c?.lines?.length ? x ? [...c.lines, "Updates delayed"] : c.lines : [C], T = f?.status === "generating" ? `${f.label} generating` : f?.status === "failed" ? `${f.label} generation failed` : e.status === "running" && !m ? "running, updates delayed" : S ? `waiting, ${S}` : e.status, E = {
		kind: "node",
		id: e.id,
		...u ? { revisionId: u.id } : {}
	}, D = () => o(E);
	return /* @__PURE__ */ Z("div", {
		className: "pointer-events-auto relative w-[200px]",
		"data-emphasis": c?.emphasis ?? "current",
		"data-work-node": e.id,
		onClick: D,
		children: [
			/* @__PURE__ */ Z("article", {
				role: "button",
				tabIndex: 0,
				"aria-label": `${p}, ${T}`,
				"aria-pressed": r,
				"data-work-card": e.id,
				onKeyDown: (e) => {
					(e.key === "Enter" || e.key === " ") && (e.preventDefault(), D());
				},
				className: t("relative overflow-hidden rounded-lg border bg-surface text-left shadow-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary", y ? "border-danger" : b ? "border-info" : _ ? "border-success" : "border-border", y || b || _ ? "border-2" : "", _ && "bg-success-bg/40", h && "opacity-80", r && "ring-2 ring-primary/30"),
				children: [
					/* @__PURE__ */ X("span", {
						"aria-hidden": "true",
						className: t("absolute inset-y-0 left-0 w-[3px]", y ? "bg-danger" : _ ? "bg-success" : b ? "bg-info" : v.bar)
					}),
					/* @__PURE__ */ Z("header", {
						className: "flex items-center gap-2 border-b border-border bg-surface-panel py-1.5 pl-3.5 pr-2.5",
						children: [
							/* @__PURE__ */ X("span", {
								"aria-hidden": "true",
								className: t("flex h-5 w-5 shrink-0 items-center justify-center rounded text-xs leading-none", v.chip),
								children: xn[e.kind]
							}),
							/* @__PURE__ */ X("span", {
								title: p,
								className: t("min-w-0 flex-1 truncate text-[12px] font-semibold", h ? "text-text-secondary" : "text-text-primary"),
								children: p
							}),
							/* @__PURE__ */ X("span", {
								"aria-hidden": "true",
								className: t("h-2 w-2 shrink-0 rounded-full", h ? "bg-border-emphasis" : En[e.status])
							})
						]
					}),
					/* @__PURE__ */ Z("div", {
						className: t("space-y-1.5 py-2 pl-3.5 pr-2.5 text-xs leading-snug", h ? "text-text-tertiary" : "text-text-secondary"),
						children: [
							w.map((n, r) => /* @__PURE__ */ Z("div", {
								className: "flex items-start justify-between gap-1.5",
								children: [
									/* @__PURE__ */ X("span", {
										"data-ui-text": "graph-detail",
										className: "min-w-0",
										children: n
									}),
									r === 0 && c?.badge && /* @__PURE__ */ X("span", {
										"data-ui-text": "graph-metadata",
										className: t("shrink-0 rounded px-1.5 py-px text-xs font-semibold", e.status === "running" ? "border border-info-border text-info-fg" : "bg-info-bg text-info-fg"),
										children: c.badge
									}),
									r === 0 && !c?.badge && S && n !== S && /* @__PURE__ */ X("span", {
										"data-ui-text": "graph-metadata",
										"data-testid": "work-card-pause",
										className: "shrink-0 rounded bg-warning-bg px-1.5 py-px text-xs font-semibold text-warning-fg",
										children: S
									})
								]
							}, `${r}-${n}`)),
							!!c?.participants?.length && /* @__PURE__ */ Z("div", {
								className: "flex items-center gap-1.5",
								children: [/* @__PURE__ */ X("span", {
									className: "flex -space-x-1.5",
									children: c.participants.slice(0, 3).map((e) => /* @__PURE__ */ X(M, {
										name: e.label,
										src: e.avatarUrl,
										size: 18,
										className: "ring-1 ring-surface"
									}, e.id))
								}), /* @__PURE__ */ Z("span", {
									"data-ui-text": "graph-metadata",
									className: "min-w-0 truncate text-xs",
									children: [c.participants.map((e) => e.label).slice(0, 2).join(", "), c.participants.length > 2 ? ` +${c.participants.length - 2}` : ""]
								})]
							}),
							c?.excerpt && /* @__PURE__ */ X("p", {
								"data-ui-text": "graph-detail",
								className: t("text-xs italic", h ? "text-text-secondary" : "text-text-primary"),
								children: `“${c.excerpt}”`
							}),
							c?.attentionLabel && /* @__PURE__ */ X("p", {
								"data-ui-text": "graph-detail",
								className: "font-medium text-text-primary",
								children: c.attentionLabel
							}),
							u?.preview && /* @__PURE__ */ X("div", {
								className: t("aspect-video w-full overflow-hidden rounded-lg border border-border bg-surface", "flex items-center justify-center [&>*]:h-full [&>*]:w-full [&_img]:h-full [&_img]:w-full [&_img]:object-contain [&_svg]:h-full [&_svg]:w-full"),
								"aria-label": `${p} ${u.label} preview`,
								children: u.preview
							}),
							!!c?.artifact?.revisions.length && /* @__PURE__ */ Z("div", {
								className: "flex flex-wrap items-center gap-1 text-xs",
								"aria-label": `${p} revisions`,
								children: [c.artifact.revisions.map((e) => /* @__PURE__ */ X("span", {
									"data-ui-text": "graph-metadata",
									className: t("rounded px-1.5 py-0.5", e.id === u?.id ? "bg-info-bg font-medium text-info-fg" : "text-text-tertiary"),
									children: e.label
								}, e.id)), f?.status === "generating" && /* @__PURE__ */ Z("span", {
									"data-ui-text": "graph-metadata",
									className: "rounded px-1.5 py-0.5 text-info-fg",
									children: [f.label, " generating"]
								})]
							}),
							f?.status === "failed" && !c?.lines?.length && /* @__PURE__ */ Z("p", {
								"data-ui-text": "graph-detail",
								className: "text-danger-fg",
								children: [f.label, " generation failed"]
							})
						]
					}),
					c?.footer && /* @__PURE__ */ Z("div", {
						className: "flex items-center justify-between gap-2 border-t border-border py-1.5 pl-3.5 pr-2.5 text-xs text-text-tertiary",
						children: [/* @__PURE__ */ X("span", {
							"data-ui-text": "graph-metadata",
							className: "truncate",
							children: c.footer.label
						}), c.footer.note && /* @__PURE__ */ X("span", {
							"data-ui-text": "graph-metadata",
							className: "shrink-0",
							children: c.footer.note
						})]
					})
				]
			}),
			!!c?.tools?.length && /* @__PURE__ */ Z("div", {
				className: "flex flex-wrap items-center gap-1.5 pl-1 pt-1 text-xs text-text-tertiary",
				children: [/* @__PURE__ */ X("span", {
					"data-ui-text": "graph-metadata",
					children: "Tools"
				}), c.tools.map((e) => /* @__PURE__ */ X("span", {
					"data-ui-text": "graph-metadata",
					className: "rounded bg-surface-panel px-1.5 py-0.5 font-semibold text-text-secondary",
					children: e
				}, e))]
			}),
			!!c?.feedbackCount && s && (!i || u) && /* @__PURE__ */ Z(l, {
				size: "sm",
				className: "nodrag nopan absolute -right-2 -top-3 h-7 w-7 rounded-full border border-border bg-surface shadow-sm",
				"aria-label": `${c.feedbackCount} comments on ${p}`,
				onClick: (e) => {
					e.stopPropagation(), s(E);
				},
				children: [/* @__PURE__ */ X(d, { size: 14 }), /* @__PURE__ */ X("span", {
					"data-ui-text": "graph-metadata",
					className: "absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-0.5 text-xs leading-none text-white",
					children: c.feedbackCount
				})]
			})
		]
	});
}
//#endregion
//#region src/components/graph/work/WorkOmittedGroup.tsx
var On = {
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
function kn(e, t) {
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
function An({ omitted: e, timezone: r, className: i }) {
	let { count: a, expanded: o, items: s, loading: c, error: l, hasMore: u, onExpand: d, onCollapse: f, onLoadMore: p } = e, m = a.toLocaleString();
	if (!o) return /* @__PURE__ */ Z("div", {
		className: t("flex items-center gap-2 rounded-xl border border-dashed border-border bg-surface/90 px-3 py-1.5 shadow-sm", i),
		"data-testid": "work-omitted-group",
		"data-expanded": "false",
		children: [/* @__PURE__ */ Z("span", {
			className: "text-[12px] font-semibold text-text-secondary",
			children: [m, " more earlier"]
		}), /* @__PURE__ */ X(n, {
			size: "sm",
			variant: "link",
			"aria-expanded": !1,
			"aria-label": `Show ${m} earlier items held back from the graph`,
			onClick: d,
			children: "Show"
		})]
	});
	let h = Math.max(0, a - s.length);
	return /* @__PURE__ */ Z("section", {
		"aria-label": `${m} earlier items`,
		className: t("flex max-h-full w-[min(22rem,calc(100vw-2rem))] min-h-0 flex-col rounded-xl border border-dashed border-border bg-surface shadow-md", i),
		"data-testid": "work-omitted-group",
		"data-expanded": "true",
		children: [
			/* @__PURE__ */ Z("header", {
				className: "flex items-center justify-between gap-2 border-b border-border-subtle px-3 py-1.5",
				children: [/* @__PURE__ */ Z("span", {
					className: "min-w-0 truncate text-[12px] font-semibold text-text-secondary",
					children: [m, " more earlier · newest first"]
				}), /* @__PURE__ */ X(n, {
					size: "sm",
					variant: "link",
					"aria-expanded": !0,
					onClick: f,
					children: "Collapse"
				})]
			}),
			/* @__PURE__ */ Z("ul", {
				className: "min-h-0 flex-1 divide-y divide-border-subtle overflow-auto",
				"data-testid": "work-omitted-items",
				children: [s.map((e) => /* @__PURE__ */ Z("li", {
					className: "flex items-center gap-2 px-3 py-1.5",
					"data-work-omitted-item": e.id,
					children: [/* @__PURE__ */ Z("span", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ X("span", {
							className: "block truncate text-xs font-medium text-text-primary",
							title: e.title,
							children: e.locked ? "Restricted work item" : e.title.trim() || "Untitled work item"
						}), /* @__PURE__ */ Z("span", {
							className: "block text-[12px] text-text-tertiary",
							children: [
								On[e.kind] ?? e.kind,
								" · ",
								kn(e.updatedAt, r)
							]
						})]
					}), /* @__PURE__ */ X(jt, {
						status: e.status,
						className: "shrink-0 text-[12px]"
					})]
				}, e.id)), s.length === 0 && !c && !l && /* @__PURE__ */ X("li", {
					className: "px-3 py-2 text-xs text-text-tertiary",
					children: "Nothing to show yet."
				})]
			}),
			l && /* @__PURE__ */ X(F, {
				tone: "error",
				className: "mx-2 my-1 text-[12px]",
				children: l
			}),
			/* @__PURE__ */ Z("footer", {
				className: "flex items-center justify-between gap-2 border-t border-border-subtle px-3 py-1.5 text-[12px] text-text-tertiary",
				children: [/* @__PURE__ */ Z("span", { children: [
					s.length.toLocaleString(),
					" of ",
					m,
					" shown"
				] }), (u || c) && /* @__PURE__ */ X(n, {
					size: "sm",
					variant: "secondary",
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
var jn = 24, Mn = 56, Nn = "!h-1.5 !w-1.5 !min-h-0 !min-w-0 !border-0 !bg-border-emphasis";
function Pn({ data: e, selected: t }) {
	return /* @__PURE__ */ Z(Y, { children: [
		/* @__PURE__ */ X(Q, {
			type: "target",
			id: "in-left",
			position: $.Left,
			isConnectable: !1,
			className: Nn
		}),
		/* @__PURE__ */ X(Q, {
			type: "target",
			id: "in-top",
			position: $.Top,
			isConnectable: !1,
			className: Nn
		}),
		/* @__PURE__ */ X(Dn, {
			node: e.entity,
			detail: e.detail,
			live: e.live,
			selected: !!t,
			selectedRevisionId: e.revisionId,
			onSelect: e.onSelect,
			onFeedback: e.onFeedback
		}),
		/* @__PURE__ */ X(Q, {
			type: "source",
			id: "out-right",
			position: $.Right,
			isConnectable: !1,
			className: Nn
		}),
		/* @__PURE__ */ X(Q, {
			type: "source",
			id: "out-bottom",
			position: $.Bottom,
			isConnectable: !1,
			className: Nn
		})
	] });
}
function Fn({ data: e }) {
	return /* @__PURE__ */ X(N, {
		tone: "surface",
		titleText: e.title,
		title: /* @__PURE__ */ Z("span", {
			className: "flex min-w-0 max-w-full items-center gap-1.5 font-sans text-[12px] font-semibold text-text-secondary",
			children: [e.live && /* @__PURE__ */ X("span", {
				"aria-hidden": "true",
				className: "inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-primary/50"
			}), /* @__PURE__ */ X("span", {
				className: "truncate",
				"data-work-effort-title": "",
				children: e.title
			})]
		}),
		className: "pointer-events-none h-full w-full rounded-xl border-dashed border-border-subtle bg-surface/60",
		"data-testid": "work-effort",
		children: /* @__PURE__ */ Z("div", {
			className: "flex min-w-0 items-center gap-2 px-4 pt-1 text-[12px] leading-4 text-text-tertiary",
			children: [/* @__PURE__ */ Z("span", {
				className: "min-w-0 flex-1 truncate",
				title: e.subtitle,
				children: [e.subtitle, e.cycle && /* @__PURE__ */ X("span", {
					role: "status",
					className: "ml-2 text-warning-fg",
					children: "Relationship order unavailable"
				})]
			}), /* @__PURE__ */ Z("span", {
				className: "pointer-events-auto flex shrink-0 items-center gap-2 text-xs",
				children: [e.sources > 0 && /* @__PURE__ */ X(n, {
					size: "sm",
					variant: "link",
					className: "nodrag nopan",
					"aria-label": `${e.expanded ? "Hide" : "Show"} ${e.sources} sources for ${e.title}`,
					onClick: e.onSources,
					children: e.expanded ? "Hide sources" : `+ ${e.sources} sources`
				}), /* @__PURE__ */ X(n, {
					size: "sm",
					variant: "link",
					className: "nodrag nopan",
					"aria-label": e.focused ? "Show all activities" : `Focus on ${e.title}`,
					onClick: e.onFocus,
					children: e.focused ? "All activities" : "Focus"
				})]
			})]
		})
	});
}
function In(e) {
	let n = e.data;
	return n ? /* @__PURE__ */ Z(Y, { children: [/* @__PURE__ */ X(me, {
		...e,
		data: { state: n.failed ? "traversed-failure" : n.active ? "active" : "default" }
	}), /* @__PURE__ */ X(we, { children: /* @__PURE__ */ X("button", {
		type: "button",
		className: t("nodrag nopan pointer-events-auto absolute z-10 flex items-center justify-center rounded-full text-xs font-medium leading-none focus-visible:outline-2 focus-visible:outline-primary", n.pill ? t("h-5 max-w-28 border bg-surface px-2 shadow-sm", n.failed ? "border-danger text-danger-fg" : n.active ? "border-info text-info-fg" : "border-border-emphasis text-text-secondary") : "h-3 w-3 border border-transparent bg-transparent text-transparent focus-visible:border-border focus-visible:bg-surface"),
		style: { transform: `translate(-50%, -50%) translate(${n.labelX}px, ${n.labelY}px)` },
		onClick: n.onSelect,
		"aria-label": `${n.label}${n.failed ? ", failed" : n.active ? ", active" : ""}`,
		title: n.label,
		"data-work-edge-label": n.canonicalId,
		children: n.pill ? /* @__PURE__ */ X("span", {
			className: "truncate",
			children: n.pill
		}) : /* @__PURE__ */ X("span", {
			className: "sr-only",
			children: n.label
		})
	}) })] }) : null;
}
var Ln = {
	activity: Pn,
	effort: Fn
}, Rn = { activity: In }, zn = {
	ArrowRight: [1, 0],
	ArrowLeft: [-1, 0],
	ArrowDown: [0, 1],
	ArrowUp: [0, -1]
};
function Bn(e, t, [n, r]) {
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
function Vn(e) {
	let { activity: t, nodes: r, edges: i, selection: a, viewport: o, onViewportChange: s, onSelectionChange: c, background: u = "ripple-grid", onViewAsList: d, maxEfforts: f = 2 } = e, p = q(null), [m, h] = J({
		width: 640,
		height: 480
	}), [g, _] = J(/* @__PURE__ */ new Map()), v = q(/* @__PURE__ */ new Map()), y = q(null), b = q(void 0), x = q(t.view.focusedEffortId), { view: S, onViewChange: C } = t, w = Ve().right;
	G(() => {
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
	let T = [...Object.keys(t.edgeLabels ?? {}), ...t.failedEdgeIds ?? []].sort().join("\0"), E = a?.kind === "node" ? a.id : void 0, D = S.focusedEffortId ?? (E ? t.efforts.find((e) => e.nodeIds.includes(E))?.id ?? null : null), O = K(() => yn(t.efforts, r, {
		max: f,
		keepEffortId: D
	}), [
		t.efforts,
		r,
		f,
		D
	]), k = K(() => bn(r, i, O, {
		width: m.width,
		height: m.height,
		full: t.mode === "full",
		focusedEffortId: S.focusedEffortId,
		expandedSourceEfforts: S.expandedSourceEfforts,
		reversedEdgeIds: t.reversedEdgeIds,
		labelledEdgeIds: T.split("\0").filter(Boolean),
		measurements: g
	}), [
		r,
		i,
		O,
		t.mode,
		t.reversedEdgeIds,
		T,
		S.focusedEffortId,
		S.expandedSourceEfforts,
		m,
		g
	]), A = K(() => {
		let e = Math.min(0, ...k.map((e) => e.x)), t = Math.min(0, ...k.map((e) => e.y));
		return {
			left: e,
			top: t,
			width: Math.max(1, ...k.map((e) => e.x + e.width)) - e,
			height: Math.max(1, ...k.map((e) => e.y + e.height)) - t
		};
	}, [k]), j = W((e, t) => e <= m.width - 48 ? (m.width - e) / 2 - t : 24 - t, [m]), ee = W(() => {
		let { left: e, top: t, width: n, height: r } = A, i = Math.max(1, m.height - jn - Mn), a = Math.max(dn, Math.min(1.2, (m.width - 48) / n, i / r));
		return {
			x: j(n * a, e * a),
			y: jn + Math.max(0, (i - r * a) / 2) - t * a,
			zoom: a
		};
	}, [
		A,
		m,
		j
	]), M = f !== 0, N = W(() => {
		let e = ee();
		if (!M) return e;
		let { left: t, top: n, width: r } = A, i = Math.max(e.zoom, Math.min(pn, (m.width - 48) / r));
		return i <= e.zoom ? e : {
			x: j(r * i, t * i),
			y: jn - n * i,
			zoom: i
		};
	}, [
		ee,
		M,
		A,
		m,
		j
	]), P = K(() => {
		if (!E) return null;
		for (let e of k) {
			let t = e.nodes.find((e) => e.entityId === E);
			if (t) return {
				x: e.x + t.x,
				y: e.y + t.y,
				width: t.width,
				height: t.height
			};
		}
		return null;
	}, [k, E]), te = Math.max(1, m.width - w), I = W((e) => {
		if (!P) return e;
		let t = Math.max(e.zoom, Math.min(pn, (te - 48) / P.width));
		return {
			x: te / 2 - (P.x + P.width / 2) * t,
			y: m.height / 2 - (P.y + P.height / 2) * t,
			zoom: t
		};
	}, [
		P,
		m,
		te
	]), L = JSON.stringify([
		m,
		t.mode,
		S.focusedEffortId,
		S.expandedSourceEfforts,
		k.map((e) => [
			e.id,
			e.nodes.map((e) => e.id),
			e.edges.map((e) => e.id)
		]),
		k.every((e) => e.nodes.every((e) => g.has(e.entityId)))
	]);
	G(() => {
		if (y.current === L) return;
		let e = y.current === null;
		y.current = L;
		let t = x.current && !S.focusedEffortId && S.overviewViewport;
		if (x.current = S.focusedEffortId, t) {
			s(t);
			return;
		}
		e && S.canvasInitialized || (s(I(N())), b.current = E ? `${E}\u0000${w}` : void 0, S.canvasInitialized || C({
			...S,
			canvasInitialized: !0
		}));
	}, [
		L,
		N,
		I,
		S,
		C,
		s,
		E,
		w
	]), G(() => {
		if (!E) {
			b.current = void 0;
			return;
		}
		let e = `${E}\u0000${w}`;
		if (b.current === e || !P || y.current === null) return;
		b.current = e;
		let t = P.x * o.zoom + o.x, n = P.y * o.zoom + o.y;
		t >= 0 && n >= 0 && t + P.width * o.zoom <= te && n + P.height * o.zoom <= m.height || s(I(o));
	}, [
		E,
		P,
		o,
		m,
		te,
		w,
		I,
		s
	]);
	let R = (e) => C({
		...S,
		focusedEffortId: S.focusedEffortId === e ? null : e,
		overviewViewport: S.focusedEffortId ? S.overviewViewport : o
	}), re = new Map(r.map((e) => [e.id, e])), B = new Map(i.map((e) => [e.id, e])), oe = t.window.following, se = new Set(oe ? t.activeEdgeIds : []), ce = new Set(t.failedEdgeIds ?? []), V = [], H = [];
	for (let e of k) {
		let n = JSON.stringify(["effort", e.id]), r = S.expandedSourceEfforts.includes(e.id);
		V.push({
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
				live: oe && e.nodes.some((e) => re.get(e.entityId)?.status === "running"),
				sources: !S.focusedEffortId && (e.collapsedSourceCount > 0 || r) ? e.sourceCount : 0,
				expanded: r,
				focused: S.focusedEffortId === e.id,
				cycle: e.cyclicNodeIds.length > 0,
				onFocus: () => R(e.id),
				onSources: () => C({
					...S,
					expandedSourceEfforts: r ? S.expandedSourceEfforts.filter((t) => t !== e.id) : [...S.expandedSourceEfforts, e.id]
				})
			}
		});
		for (let r of e.nodes) V.push({
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
				live: oe,
				onSelect: c,
				onFeedback: t.onFeedback
			}
		});
		for (let n of e.edges) {
			let r = B.get(n.entityId), i = e.x + n.labelX, o = e.y + n.labelY, s = se.has(r.id) && r.status === "running" && !r.endedAt, l = ce.has(r.id), u = r.label || r.relation.replaceAll("-", " "), d = t.edgeLabels?.[r.id] ?? (l ? "failed" : void 0);
			H.push({
				id: n.id,
				type: "activity",
				source: n.source,
				target: n.target,
				sourceHandle: n.sourceHandle,
				targetHandle: n.targetHandle,
				selected: a?.kind === "edge" && a.id === r.id,
				focusable: !1,
				markerEnd: {
					type: Te.ArrowClosed,
					color: l ? "var(--color-danger)" : "var(--color-border-emphasis)"
				},
				data: {
					canonicalId: r.id,
					label: u,
					pill: d,
					active: s,
					failed: l,
					labelX: i,
					labelY: o,
					onSelect: () => c({
						kind: "edge",
						id: r.id
					})
				}
			});
		}
	}
	let le = new Map(V.filter((e) => e.type === "activity").map((e) => [e.id, e.data.entity.id])), ue = Math.min(un, o.zoom), U = (e) => s({
		...o,
		zoom: Math.max(ue, Math.min(2.5, o.zoom * e))
	}), de = o.zoom < fn, fe = (e) => {
		let t = zn[e.key], n = t && e.target instanceof HTMLElement ? e.target.closest("[data-work-card]") : null, r = p.current;
		if (!t || !n || !r || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
		e.preventDefault(), e.stopPropagation();
		let i = [...r.querySelectorAll("[data-work-card]")].filter((e) => e !== n).map((e) => ({
			element: e,
			rect: e.getBoundingClientRect()
		})), a = Bn(n.getBoundingClientRect(), i, t);
		if (!a) return;
		a.focus({ preventScroll: !0 });
		let c = r.getBoundingClientRect(), l = a.getBoundingClientRect(), u = c.right - w;
		l.left >= c.left && l.top >= c.top && l.right <= u && l.bottom <= c.bottom || s({
			...o,
			x: o.x + (c.left + (u - c.left) / 2) - (l.left + l.width / 2),
			y: o.y + (c.top + c.height / 2) - (l.top + l.height / 2)
		});
	}, pe = u === "ripple-grid", me = ne(p, "auto", pe);
	return /* @__PURE__ */ Z("div", {
		ref: p,
		className: "relative isolate min-h-40 min-w-0 flex-1 overflow-hidden",
		"data-testid": "work-activity-canvas",
		onKeyDown: fe,
		"data-background": u,
		"data-backdrop-ink": pe ? me === "night" ? "dark" : "light" : void 0,
		children: [
			pe && /* @__PURE__ */ X(z, {
				...me === "night" ? ie : ae,
				className: "absolute inset-0 -z-10",
				"data-testid": "work-activity-ripple"
			}),
			/* @__PURE__ */ X(Ee, {
				nodes: V,
				edges: H,
				nodeTypes: Ln,
				edgeTypes: Rn,
				viewport: o,
				onViewportChange: s,
				onPaneClick: () => c(null),
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
				children: !pe && /* @__PURE__ */ X(xe, {
					gap: 20,
					size: 1,
					color: "var(--color-border)"
				})
			}),
			(de || t.omitted) && /* @__PURE__ */ Z("div", {
				className: "pointer-events-none absolute left-3 top-3 z-10 flex max-h-[calc(100%-4.5rem)] min-h-0 max-w-[calc(100%-1.5rem)] flex-col items-start gap-2",
				"data-testid": "work-activity-top-left",
				children: [de && /* @__PURE__ */ Z(F, {
					tone: "info",
					className: "pointer-events-auto max-w-[min(26rem,100%)] text-[12px]",
					"data-testid": "work-activity-zoom-hint",
					children: [/* @__PURE__ */ Z("span", { children: ["The whole graph is in view, but too small to read.", d && " "] }), d && /* @__PURE__ */ X(n, {
						size: "sm",
						variant: "link",
						onClick: d,
						"data-testid": "work-activity-zoom-hint-list",
						children: "View as accessible list"
					})]
				}), t.omitted && /* @__PURE__ */ X(An, {
					omitted: t.omitted,
					timezone: e.timezone,
					className: "pointer-events-auto nodrag nopan"
				})]
			}),
			/* @__PURE__ */ Z("div", {
				className: "absolute z-10 bottom-3 left-3 flex items-center gap-1 rounded-md border border-border bg-surface p-1",
				"data-testid": "work-activity-controls",
				children: [
					/* @__PURE__ */ X(l, {
						size: "sm",
						"aria-label": "Zoom in",
						onClick: () => U(1.2),
						children: "+"
					}),
					/* @__PURE__ */ X(l, {
						size: "sm",
						"aria-label": "Zoom out",
						onClick: () => U(1 / 1.2),
						children: "−"
					}),
					/* @__PURE__ */ X(n, {
						size: "sm",
						variant: "secondary",
						onClick: () => s(ee()),
						children: "Fit graph"
					})
				]
			})
		]
	});
}
function Hn({ live: e }) {
	return /* @__PURE__ */ X("ul", {
		"aria-label": "Activity emphasis legend",
		className: "hidden items-center gap-2 text-xs text-text-tertiary @xl:flex",
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
		].map(([e, n, r]) => /* @__PURE__ */ Z("li", {
			className: "flex items-center gap-1",
			children: [/* @__PURE__ */ X("span", {
				"aria-hidden": "true",
				className: t("inline-block h-2 w-2 rounded-sm border", r)
			}), n]
		}, e))
	});
}
//#endregion
//#region src/components/graph/work/WorkActivityHeader.tsx
var Un = [{
	id: "activity",
	label: "Activity"
}, {
	id: "lab",
	label: "Computer Lab"
}], Wn = [
	1,
	2,
	3,
	5
], Gn = "all";
function Kn({ title: e, subtitle: n, expanded: r = !1, onExpand: i, onPopOut: a, onClose: o, actions: s, view: c = "activity", onViewChange: u, viewNote: d, effortCount: f = 0, maxEfforts: p, onMaxEffortsChange: h, className: g, "data-testid": _ = "work-activity-header" }) {
	let y = !!h && f > 1, b = p ?? 0, x = Number.isFinite(b) && b > 0 && b < f, S = [...[.../* @__PURE__ */ new Set([...Wn, ...x ? [b] : []])].filter((e) => e < f).sort((e, t) => e - t).map((e) => ({
		value: String(e),
		label: `Show ${e} of ${f} activities`
	})), {
		value: Gn,
		label: `All ${f} activities`
	}], T = /* @__PURE__ */ Z("header", {
		"data-testid": _,
		className: t("@container flex shrink-0 items-center justify-between gap-2 border-b border-border bg-surface px-3 py-1.5", g),
		children: [/* @__PURE__ */ Z("span", {
			className: "flex min-w-0 flex-col",
			children: [/* @__PURE__ */ X("span", {
				className: "truncate text-[12px] font-semibold text-text-secondary",
				"data-testid": `${_}-title`,
				children: e
			}), n && /* @__PURE__ */ X("span", {
				className: "truncate text-[12px] text-text-tertiary",
				"data-testid": `${_}-subtitle`,
				children: n
			})]
		}), /* @__PURE__ */ Z("span", {
			className: "flex shrink-0 items-center gap-1",
			children: [
				s,
				i && /* @__PURE__ */ X(w, {
					content: r ? "Show chat" : "Expand activity",
					placement: "bottom",
					children: /* @__PURE__ */ X(l, {
						size: "md",
						"aria-label": r ? "Show chat" : "Expand activity",
						"aria-pressed": r,
						onClick: i,
						"data-testid": `${_}-expand`,
						children: /* @__PURE__ */ X("svg", {
							width: "16",
							height: "16",
							viewBox: "0 0 16 16",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "1.5",
							strokeLinecap: "round",
							strokeLinejoin: "round",
							"aria-hidden": "true",
							children: r ? /* @__PURE__ */ Z(Y, { children: [/* @__PURE__ */ X("rect", {
								x: "2",
								y: "2.5",
								width: "12",
								height: "11",
								rx: "1.5"
							}), /* @__PURE__ */ X("path", { d: "M6 2.5v11" })] }) : /* @__PURE__ */ X("path", { d: "M6 2H2v4M10 2h4v4M14 10v4h-4M6 14H2v-4" })
						})
					})
				}),
				a && /* @__PURE__ */ X(w, {
					content: "Open activity in its own page",
					placement: "bottom",
					children: /* @__PURE__ */ X(l, {
						size: "md",
						"aria-label": "Open activity in its own page",
						onClick: a,
						"data-testid": `${_}-pop-out`,
						children: /* @__PURE__ */ X("svg", {
							width: "16",
							height: "16",
							viewBox: "0 0 16 16",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "1.5",
							strokeLinecap: "round",
							strokeLinejoin: "round",
							"aria-hidden": "true",
							children: /* @__PURE__ */ X("path", { d: "M9 2h5v5M14 2 7 9M6 3H3a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-3" })
						})
					})
				}),
				o && /* @__PURE__ */ X(w, {
					content: "Close activity",
					placement: "bottom",
					children: /* @__PURE__ */ X(l, {
						size: "md",
						"aria-label": "Close activity",
						onClick: o,
						"data-testid": `${_}-close`,
						children: /* @__PURE__ */ X(m, {})
					})
				})
			]
		})]
	});
	return !u && !y ? T : /* @__PURE__ */ Z("div", {
		className: "flex shrink-0 flex-col",
		children: [T, /* @__PURE__ */ Z("div", {
			"data-testid": `${_}-views`,
			className: "@container flex shrink-0 items-center gap-2.5 border-b border-border bg-surface px-3 py-1.5",
			children: [
				u && /* @__PURE__ */ X(v, {
					items: Un,
					value: c,
					onValueChange: (e) => u(e),
					variant: "segmented",
					size: "sm",
					"aria-label": "Side panel content",
					idPrefix: `${_}-view`
				}),
				y && /* @__PURE__ */ X(C, {
					size: "sm",
					variant: "pill",
					className: "max-w-52 truncate normal-case",
					"aria-label": "Activities shown",
					"data-testid": `${_}-max-efforts`,
					options: S,
					value: x ? String(b) : Gn,
					onChange: (e) => h(e.target.value === Gn ? 0 : Number(e.target.value))
				}),
				d && /* @__PURE__ */ X("span", {
					className: "hidden min-w-0 truncate text-[12px] text-text-tertiary @lg:inline",
					"data-testid": `${_}-view-note`,
					children: d
				})
			]
		})]
	});
}
//#endregion
//#region src/components/graph/work/WorkKindLegend.tsx
var qn = (e, t, n) => `${e} ${e === 1 ? t : n}`;
function Jn({ nodes: e, edges: n, className: r, "data-testid": i = "work-kind-legend" }) {
	let a = wn(e);
	return /* @__PURE__ */ Z("span", {
		className: t("flex min-w-0 items-center gap-3 text-[12px] text-text-tertiary", r),
		"data-testid": i,
		children: [/* @__PURE__ */ X("ul", {
			"aria-label": "Kinds of work shown",
			className: "flex min-w-0 items-center gap-2",
			children: a.map(({ kind: e, count: n }) => {
				let r = `${n} ${Cn[e]}`;
				return /* @__PURE__ */ Z("li", {
					className: "flex shrink-0 items-center gap-1",
					title: r,
					"aria-label": r,
					"data-kind": e,
					"data-count": n,
					"data-testid": `${i}-kind`,
					children: [
						/* @__PURE__ */ X("span", {
							"aria-hidden": "true",
							className: t("flex h-4 w-4 items-center justify-center rounded text-[10px] leading-none", Sn[e].chip),
							children: xn[e]
						}),
						/* @__PURE__ */ X("span", {
							"aria-hidden": "true",
							className: "hidden @3xl:inline",
							children: Cn[e]
						}),
						/* @__PURE__ */ X("span", {
							"aria-hidden": "true",
							className: "tabular-nums",
							children: n
						})
					]
				}, e);
			})
		}), /* @__PURE__ */ Z("span", {
			className: "shrink-0 tabular-nums text-text-secondary",
			"data-testid": `${i}-counts`,
			"data-nodes": e.length,
			"data-edges": n.length,
			children: [
				qn(e.length, "item", "items"),
				" · ",
				qn(n.length, "link", "links")
			]
		})]
	});
}
//#endregion
//#region src/components/graph/work/WorkArtifactInspector.tsx
function Yn(e, t) {
	let n = t.revisionId ? e.revisions.find((e) => e.id === t.revisionId) : e.revisions.at(-1), r = n?.slides ?? [];
	return {
		revision: n,
		slides: r,
		slide: r.find((e) => e.id === t.anchorId) ?? r.find((e) => e.id === n?.anchorId) ?? r[0]
	};
}
function Xn({ node: e, artifact: r, selection: i, onSelectionChange: a, onOpen: o, onReference: s, quiet: c = !1 }) {
	let u = ye(), { revision: d, slides: f, slide: p } = Yn(r, i), m = p ? f.indexOf(p) : -1, h = {
		...i,
		revisionId: d?.id,
		anchorId: p?.id ?? d?.anchorId
	}, g = e.capabilities.includes("view-document") || e.capabilities.includes("edit-document"), _ = r.pending, y = (t) => a({
		kind: "node",
		id: e.id,
		revisionId: d?.id,
		anchorId: t
	}), x = [...r.revisions.map((e) => ({
		id: e.id,
		label: e.label
	})), ..._?.status === "generating" ? [{
		id: _.id,
		label: `${_.label} · Generating`,
		disabled: !0
	}] : []];
	return /* @__PURE__ */ Z("div", {
		className: "space-y-3",
		children: [
			r.revisions.length > 0 && /* @__PURE__ */ Z("section", {
				className: "space-y-1.5",
				children: [/* @__PURE__ */ X("h3", {
					className: "text-[10px] font-semibold uppercase tracking-wide text-text-tertiary",
					children: "Revisions"
				}), /* @__PURE__ */ X(v, {
					idPrefix: u,
					"aria-label": "Available revisions",
					variant: "segmented",
					size: "sm",
					className: "w-full [&>button]:flex-1",
					items: x,
					value: d?.id ?? "",
					onValueChange: (t) => {
						t !== _?.id && a({
							kind: "node",
							id: e.id,
							revisionId: t
						});
					}
				})]
			}),
			_?.status === "generating" && !c && /* @__PURE__ */ Z("p", {
				role: "status",
				className: "text-xs text-text-secondary",
				children: [
					_.label,
					" is generating. You can review available revisions.",
					_.message ? ` ${_.message}` : ""
				]
			}),
			_?.status === "failed" && !c && /* @__PURE__ */ Z("p", {
				role: "status",
				className: "text-xs text-danger-fg",
				children: [
					_.label,
					" could not be generated.",
					_.message ? ` ${_.message}` : ""
				]
			}),
			d ? /* @__PURE__ */ Z(b, {
				idPrefix: u,
				id: d.id,
				when: d.id,
				className: "space-y-2",
				children: [
					/* @__PURE__ */ X("div", {
						"aria-label": `${d.label} preview`,
						className: t("aspect-video overflow-hidden rounded-lg border border-border bg-surface", Tn),
						children: p?.preview ?? d.preview ?? /* @__PURE__ */ X("span", {
							className: "flex h-full items-center justify-center text-sm text-text-secondary",
							children: "Preview unavailable"
						})
					}),
					f.length > 0 && p && /* @__PURE__ */ Z("div", {
						className: "flex items-center gap-1",
						children: [
							/* @__PURE__ */ X(l, {
								size: "sm",
								"aria-label": "Previous slide",
								disabled: m <= 0,
								onClick: () => y(f[m - 1].id),
								children: "‹"
							}),
							/* @__PURE__ */ Z("span", {
								className: "flex-1 text-center text-xs text-text-secondary",
								children: [
									"Slide ",
									p.index,
									" of ",
									f.length
								]
							}),
							/* @__PURE__ */ X(l, {
								size: "sm",
								"aria-label": "Next slide",
								disabled: m >= f.length - 1,
								onClick: () => y(f[m + 1].id),
								children: "›"
							}),
							/* @__PURE__ */ X(C, {
								size: "sm",
								"aria-label": "Slide",
								className: "w-32",
								value: p.id,
								options: f.map((e) => ({
									value: e.id,
									label: `${e.index}. ${e.title}`
								})),
								onChange: (e) => y(e.target.value)
							})
						]
					}),
					r.onOpenPreview && /* @__PURE__ */ X(n, {
						size: "sm",
						variant: "secondary",
						fullWidth: !0,
						onClick: () => r.onOpenPreview(d.id, p?.id ?? d.anchorId),
						children: "Open larger preview"
					}),
					!p && /* @__PURE__ */ X("p", {
						className: "text-xs text-text-secondary",
						children: d.anchorLabel ?? d.label
					})
				]
			}) : /* @__PURE__ */ X("p", {
				className: "text-sm text-text-secondary",
				children: i.revisionId ? "The selected revision is unavailable." : "No revision is available yet."
			}),
			/* @__PURE__ */ Z("div", {
				className: "flex flex-wrap gap-2",
				children: [g && o && d && /* @__PURE__ */ X(n, {
					size: "sm",
					variant: "secondary",
					onClick: () => o(h),
					children: "Open presentation"
				}), s && d && /* @__PURE__ */ X(n, {
					size: "sm",
					variant: "secondary",
					onClick: () => s(h),
					children: "Reference in chat"
				})]
			})
		]
	});
}
//#endregion
//#region src/components/graph/work/WorkComputePane.tsx
var Zn = _e(() => import("./ChatLabTerminal-C7m06IJV.js")), Qn = {
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
}, $n = {
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
}, er = {
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
}, tr = {
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
function nr(e) {
	let t = 2166136261;
	for (let n = 0; n < e.length; n += 1) t ^= e.charCodeAt(n), t = Math.imul(t, 16777619);
	return t >>> 0;
}
function rr(e) {
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : t.toLocaleTimeString([], { hour12: !1 });
}
function ir(e) {
	if (e == null || !Number.isFinite(e) || e < 0) return "";
	let t = Math.round(e / 1e3);
	if (t < 60) return `${t}s`;
	let n = Math.floor(t / 60);
	return n < 60 ? t % 60 ? `${n}m ${t % 60}s` : `${n}m` : `${Math.floor(n / 60)}h ${String(n % 60).padStart(2, "0")}m`;
}
function ar(e) {
	let t = $n[e.status].word, n = ir(e.elapsedMs);
	return n ? e.status === "running" ? `${t} · ${n} elapsed` : `${t} · ${n}` : t;
}
function or(e) {
	let { metrics: t, task: n } = e, r = t.contextBudgetTokens;
	return {
		id: e.label,
		label: e.label,
		sessionId: e.shell?.sessionId ?? "",
		createdAt: n.startedAt ?? "",
		status: Qn[e.status].box,
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
function sr({ label: e, value: t, title: n }) {
	return /* @__PURE__ */ Z("div", {
		className: "min-w-0 rounded-md border border-border bg-surface-inset px-2 py-1.5",
		children: [/* @__PURE__ */ X("span", {
			className: "block text-[10px] font-semibold uppercase tracking-wide text-text-tertiary",
			children: e
		}), /* @__PURE__ */ X("span", {
			className: "block truncate font-mono text-[12px] text-text-primary",
			title: n,
			children: t
		})]
	});
}
function cr({ label: e, trailing: t, children: n }) {
	return /* @__PURE__ */ Z("section", {
		className: "space-y-1.5 rounded-md border border-border p-2.5",
		children: [/* @__PURE__ */ Z("h4", {
			className: "flex items-baseline gap-2 text-[10px] font-semibold uppercase tracking-wide text-text-tertiary",
			children: [/* @__PURE__ */ X("span", {
				className: "min-w-0 truncate",
				children: e
			}), t && /* @__PURE__ */ X("span", {
				className: "ml-auto shrink-0 normal-case tracking-normal text-text-tertiary",
				children: t
			})]
		}), n]
	});
}
function lr({ lines: e, running: n, label: r, environment: i, seed: a, testId: o }) {
	return /* @__PURE__ */ Z("div", {
		"data-testid": o,
		className: "overflow-hidden rounded-md border border-code-border bg-code-bg font-mono text-[11px] leading-relaxed",
		children: [/* @__PURE__ */ Z("div", {
			className: t("flex items-center gap-2 border-b border-code-border px-2 py-1", n ? "bg-transparent" : "bg-code-panel"),
			children: [
				/* @__PURE__ */ X("span", {
					"aria-hidden": "true",
					className: "text-code-green",
					children: "$"
				}),
				/* @__PURE__ */ X("span", {
					className: "min-w-0 truncate text-code-text",
					children: r
				}),
				/* @__PURE__ */ X("span", {
					className: "ml-auto shrink-0 text-code-blue",
					children: i
				})
			]
		}), /* @__PURE__ */ Z(re, {
			active: n,
			particleCount: 90,
			speed: .1,
			alphaParticles: !0,
			particleColors: R,
			fallbackIntensity: "low",
			seed: a,
			className: "space-y-0.5 px-2 py-1.5",
			"data-testid": `${o}-particles`,
			children: [
				e.map((e, n) => {
					let r = er[e.glyph] ?? er.text;
					return /* @__PURE__ */ Z("p", {
						className: "flex gap-1.5",
						children: [/* @__PURE__ */ X("span", {
							"aria-hidden": "true",
							className: t("shrink-0", r.text),
							children: r.glyph
						}), /* @__PURE__ */ X("span", {
							className: "min-w-0 whitespace-pre-wrap break-words text-code-subtle",
							children: e.text
						})]
					}, `${n}-${e.text}`);
				}),
				!e.length && /* @__PURE__ */ X("p", {
					className: "text-code-muted",
					children: "No output yet."
				}),
				n && /* @__PURE__ */ X("p", {
					"aria-hidden": "true",
					className: "text-code-green",
					children: /* @__PURE__ */ X("span", {
						className: "inline-block animate-pulse motion-reduce:animate-none",
						children: "▌"
					})
				})
			]
		})]
	});
}
function ur({ compute: e, banner: r, className: i, "data-testid": a = "work-compute-pane" }) {
	let [o, c] = J("activity"), [l, u] = J([]), d = Qn[e.status] ?? Qn.running, { metrics: f, task: p } = e, m = e.runtime === "agentcore-microvm" ? "AgentCore microVM" : "Local runtime", h = K(() => or(e), [e]), g = K(() => nr(e.shell?.sessionId ?? e.label), [e.shell?.sessionId, e.label]), _ = f.contextBudgetTokens, y = _ ? `${Math.round(f.contextTokens / _ * 100)}% (${U(_)})` : U(f.contextTokens), x = K(() => e.events.map((e) => {
		let n = l.includes(e.id), r = tr[e.kind] ?? tr.text;
		return {
			id: e.id,
			timestamp: rr(e.at),
			...e.kind === "error" ? { level: "error" } : {},
			message: /* @__PURE__ */ Z("span", {
				className: "flex flex-wrap items-baseline gap-1.5",
				children: [
					/* @__PURE__ */ X("span", {
						"aria-hidden": "true",
						className: t("shrink-0", r.text),
						children: r.glyph
					}),
					/* @__PURE__ */ X("span", {
						className: t("whitespace-pre-wrap break-words", r.text),
						children: e.text
					}),
					e.mock && /* @__PURE__ */ X(s, {
						size: "xs",
						mono: !0,
						uppercase: !0,
						palette: "code",
						tone: "caution",
						title: "Produced by a mock runtime, not a real box",
						children: "mock"
					}),
					e.detail && /* @__PURE__ */ X("button", {
						type: "button",
						"aria-expanded": n,
						onClick: () => u((t) => t.includes(e.id) ? t.filter((t) => t !== e.id) : [...t, e.id]),
						className: "cursor-pointer border-none bg-transparent p-0 text-[10px] uppercase tracking-wide text-code-muted hover:text-code-text",
						children: n ? "− hide" : "+ detail"
					}),
					e.detail && n && /* @__PURE__ */ X("span", {
						className: "mt-1 block w-full whitespace-pre-wrap break-words rounded border border-code-border bg-code-bg px-2 py-1 text-[11px] text-code-subtle",
						children: e.detail
					})
				]
			})
		};
	}), [e.events, l]), S = r ?? {
		tone: d.tone,
		title: p.title,
		description: [
			e.label,
			m,
			p.startedAt ? `started ${p.startedAt}` : null,
			e.shared ? "Shared with you" : "Yours"
		].filter(Boolean).join(" · ")
	}, C = S.tone === "error" ? {
		card: "border-danger-border bg-danger-bg",
		dot: "bg-danger",
		title: "text-danger-fg"
	} : S.tone === "success" ? {
		card: "border-success-border bg-success-bg",
		dot: "bg-success",
		title: "text-success-fg"
	} : {
		card: "border-info-border bg-info-bg",
		dot: "bg-info",
		title: "text-info-fg"
	}, w = () => {
		c("shell"), e.onOpenShell?.();
	}, T = [
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
	], E = o === "shell" && !e.shell ? "activity" : o;
	return /* @__PURE__ */ Z("div", {
		"data-testid": a,
		"data-status": e.status,
		className: t("space-y-3", i),
		children: [
			/* @__PURE__ */ Z("div", {
				role: "status",
				"data-testid": `${a}-card`,
				"data-tone": S.tone,
				className: t("flex gap-2 rounded-md border p-2.5", C.card),
				children: [/* @__PURE__ */ X("span", {
					"aria-hidden": "true",
					className: t("mt-1.5 h-2 w-2 shrink-0 rounded-full", C.dot, d.busy && "animate-pulse motion-reduce:animate-none")
				}), /* @__PURE__ */ Z("span", {
					className: "min-w-0",
					children: [
						/* @__PURE__ */ X("span", {
							className: t("block text-[13px] font-semibold", C.title),
							children: S.title
						}),
						S.description && /* @__PURE__ */ X("span", {
							className: "block text-xs text-text-secondary",
							children: S.description
						}),
						p.description && /* @__PURE__ */ X("span", {
							className: "mt-1 block text-xs text-text-secondary",
							children: p.description
						})
					]
				})]
			}),
			e.notice && /* @__PURE__ */ X("p", {
				role: "status",
				"data-testid": `${a}-notice`,
				className: "rounded-md border border-warning-border bg-warning-bg px-2 py-1 text-[11px] text-warning-fg",
				children: e.notice
			}),
			/* @__PURE__ */ Z("div", {
				className: "flex items-center gap-2",
				"data-testid": `${a}-owner`,
				children: [
					/* @__PURE__ */ X(M, {
						name: e.owner.name,
						size: 22,
						...e.owner.avatarUrl ? { src: e.owner.avatarUrl } : {}
					}),
					/* @__PURE__ */ Z("span", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ X("span", {
							className: "block truncate text-[13px] text-text-primary",
							children: e.owner.name
						}), /* @__PURE__ */ X("span", {
							className: "block truncate text-[11px] text-text-tertiary",
							children: e.shared ? "Shared with you" : "Yours"
						})]
					}),
					/* @__PURE__ */ X(O, {
						state: d.pill,
						label: d.label,
						size: "sm",
						"data-testid": `${a}-status`
					})
				]
			}),
			/* @__PURE__ */ Z("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [
					e.shell && /* @__PURE__ */ Z(n, {
						size: "sm",
						variant: "primary",
						onClick: w,
						"data-testid": `${a}-open-shell`,
						children: [/* @__PURE__ */ X("span", {
							"aria-hidden": "true",
							className: "font-mono",
							children: ">_"
						}), " Open shell"]
					}),
					e.onOpenLab && /* @__PURE__ */ X(n, {
						size: "sm",
						variant: "secondary",
						onClick: e.onOpenLab,
						"data-testid": `${a}-open-lab`,
						children: "Open in Computer Lab"
					}),
					!!e.moreActions?.length && /* @__PURE__ */ X(ee, {
						trigger: /* @__PURE__ */ X("span", {
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
			/* @__PURE__ */ X("div", {
				className: "overflow-hidden rounded-md border border-border bg-code-bg",
				children: /* @__PURE__ */ X(fe, {
					computer: h,
					modelId: f.model,
					...e.idleWindowMs ? { idleWindowMs: e.idleWindowMs } : {},
					className: "border-t-0",
					"data-testid": `${a}-gauges`
				})
			}),
			/* @__PURE__ */ Z("div", {
				className: "grid grid-cols-2 gap-2",
				"data-testid": `${a}-metrics`,
				children: [
					/* @__PURE__ */ X(sr, {
						label: "Model",
						value: pe(f.model),
						title: f.model
					}),
					/* @__PURE__ */ X(sr, {
						label: "Cost",
						value: f.costUsd == null ? "—" : `$${f.costUsd.toFixed(4)}`
					}),
					/* @__PURE__ */ X(sr, {
						label: "Context",
						value: y,
						title: `${f.contextTokens} tokens used`
					}),
					/* @__PURE__ */ X(sr, {
						label: "Environment",
						value: p.environment
					})
				]
			}),
			/* @__PURE__ */ X("div", { children: /* @__PURE__ */ X(v, {
				items: T,
				value: E,
				onValueChange: (e) => c(e),
				variant: "underline",
				size: "sm",
				idPrefix: `${a}-tab`,
				"aria-label": "Cloud session view"
			}) }),
			/* @__PURE__ */ X(b, {
				idPrefix: `${a}-tab`,
				id: "activity",
				when: E,
				className: "space-y-2",
				children: /* @__PURE__ */ Z(re, {
					active: d.busy,
					particleCount: 200,
					speed: .14,
					alphaParticles: !0,
					moveParticlesOnHover: !0,
					particleHoverFactor: .6,
					particleColors: R,
					fallbackIntensity: "medium",
					seed: g,
					className: "overflow-hidden rounded-md border border-code-border bg-code-bg",
					"data-testid": `${a}-tail`,
					children: [
						/* @__PURE__ */ Z("div", {
							className: t("flex items-center gap-2 border-b border-code-border px-2 py-1", d.busy ? "bg-transparent" : "bg-code-panel"),
							children: [
								/* @__PURE__ */ X(s, {
									size: "xs",
									mono: !0,
									palette: "code",
									tone: e.terminalPreview.running ? "success" : "neutral",
									dot: "static",
									children: e.terminalPreview.running ? "tailing" : "idle"
								}),
								d.busy && /* @__PURE__ */ X(s, {
									size: "xs",
									mono: !0,
									palette: "code",
									tone: "info",
									dot: "pulse",
									children: "running"
								}),
								/* @__PURE__ */ X("span", {
									className: "ml-auto shrink-0 font-mono text-[10px] text-code-muted",
									children: "read-only"
								}),
								e.onOpenInNew && /* @__PURE__ */ X(n, {
									tone: "code",
									variant: "ghost",
									size: "sm",
									onClick: e.onOpenInNew,
									"data-testid": `${a}-open-in-new`,
									children: "Open in new"
								})
							]
						}),
						/* @__PURE__ */ Z("div", {
							className: "flex items-center gap-2 border-b border-code-border px-2 py-1 font-mono text-[11px]",
							children: [
								/* @__PURE__ */ X("span", {
									"aria-hidden": "true",
									className: "text-code-green",
									children: "▶"
								}),
								/* @__PURE__ */ X("span", {
									className: "min-w-0 truncate text-code-text",
									children: e.label
								}),
								/* @__PURE__ */ X("span", {
									className: "ml-auto shrink-0 text-code-blue",
									children: p.environment
								})
							]
						}),
						/* @__PURE__ */ X(L, {
							lines: x,
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
			e.shell && /* @__PURE__ */ X(b, {
				idPrefix: `${a}-tab`,
				id: "shell",
				when: E,
				children: /* @__PURE__ */ X(re, {
					active: d.busy,
					particleCount: 90,
					speed: .1,
					alphaParticles: !0,
					particleColors: R,
					fallbackIntensity: "low",
					seed: g,
					className: "space-y-2 rounded-md",
					"data-testid": `${a}-shell-particles`,
					children: e.shell.shellUrl ? /* @__PURE__ */ X(he, {
						fallback: /* @__PURE__ */ X("p", {
							className: "rounded-md border border-code-border bg-code-bg px-2 py-6 text-center font-mono text-[11px] text-code-muted",
							children: "Loading terminal…"
						}),
						children: /* @__PURE__ */ X(Zn, {
							sessionId: e.shell.sessionId,
							shellUrl: e.shell.shellUrl,
							className: "flex h-72 min-h-0 flex-col overflow-hidden rounded-md border border-code-border",
							"data-testid": `${a}-terminal`
						})
					}) : /* @__PURE__ */ Z(Y, { children: [
						/* @__PURE__ */ X(lr, {
							lines: e.terminalPreview.lines,
							running: e.terminalPreview.running,
							label: e.label,
							environment: p.environment,
							seed: g,
							testId: `${a}-preview`
						}),
						/* @__PURE__ */ X("p", {
							className: "text-xs text-text-secondary",
							children: "The agent is working in a cloud computer. Open a shell to look around its workspace — the same PTY, the same files."
						}),
						/* @__PURE__ */ Z(n, {
							size: "sm",
							variant: "primary",
							fullWidth: !0,
							onClick: w,
							disabled: !e.onOpenShell,
							"data-testid": `${a}-connect`,
							children: [/* @__PURE__ */ X("span", {
								"aria-hidden": "true",
								className: "font-mono",
								children: ">_"
							}), " Open shell"]
						})
					] })
				})
			}),
			/* @__PURE__ */ Z(b, {
				idPrefix: `${a}-tab`,
				id: "workspace",
				when: E,
				className: "space-y-3",
				children: [
					/* @__PURE__ */ X(cr, {
						label: "Progress",
						trailing: `${e.progress.length} ${e.progress.length === 1 ? "step" : "steps"}`,
						children: e.progress.length ? /* @__PURE__ */ X("ol", {
							className: "space-y-1.5",
							"data-testid": `${a}-progress`,
							children: e.progress.map((e) => {
								let n = $n[e.status];
								return /* @__PURE__ */ Z("li", {
									"data-state": e.status,
									className: "flex items-baseline gap-2 text-[12px]",
									children: [
										/* @__PURE__ */ X("span", {
											"aria-hidden": "true",
											className: t("mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full", n.dot)
										}),
										/* @__PURE__ */ X("span", {
											className: t("min-w-0 flex-1 truncate", n.text),
											title: e.title,
											children: e.title
										}),
										/* @__PURE__ */ X("span", {
											className: "shrink-0 text-[11px] tabular-nums text-text-tertiary",
											children: ar(e)
										})
									]
								}, e.id);
							})
						}) : /* @__PURE__ */ X("p", {
							className: "text-xs text-text-secondary",
							children: "No plan was recorded for this session."
						})
					}),
					/* @__PURE__ */ X(cr, {
						label: "Artifacts",
						trailing: `${e.artifacts.length} ${e.artifacts.length === 1 ? "file" : "files"}`,
						children: e.artifacts.length ? /* @__PURE__ */ X("ul", {
							className: "space-y-1",
							"data-testid": `${a}-artifacts`,
							children: e.artifacts.map((e) => /* @__PURE__ */ Z("li", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ Z("span", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ X("span", {
										className: "block truncate font-mono text-[12px] text-text-primary",
										children: e.name
									}), /* @__PURE__ */ X("span", {
										className: "block truncate text-[11px] text-text-tertiary",
										children: [e.sizeBytes == null ? null : de(e.sizeBytes), e.updatedAt].filter(Boolean).join(" · ")
									})]
								}), e.onDownload && /* @__PURE__ */ X(n, {
									size: "sm",
									variant: "ghost",
									onClick: e.onDownload,
									children: "Download"
								})]
							}, e.id))
						}) : /* @__PURE__ */ X("p", {
							className: "text-xs text-text-secondary",
							children: "This session has not written a file you can see."
						})
					}),
					e.workItem && /* @__PURE__ */ X(cr, {
						label: "Work item",
						children: (() => {
							let t = e.workItem, n = /* @__PURE__ */ Z(Y, { children: [/* @__PURE__ */ Z("span", {
								className: "flex min-w-0 flex-1 flex-col text-left",
								children: [/* @__PURE__ */ Z("span", {
									className: "flex items-baseline gap-2",
									children: [/* @__PURE__ */ X("span", {
										className: "font-mono text-[12px] font-semibold text-text-primary",
										children: t.key
									}), /* @__PURE__ */ X(s, {
										size: "xs",
										children: t.status
									})]
								}), /* @__PURE__ */ X("span", {
									className: "truncate text-[12px] text-text-secondary",
									children: t.title
								})]
							}), t.onOpen && /* @__PURE__ */ X("span", {
								"aria-hidden": "true",
								className: "shrink-0 text-text-tertiary",
								children: "↗"
							})] });
							return /* @__PURE__ */ Z(Y, { children: [t.onOpen ? /* @__PURE__ */ X("button", {
								type: "button",
								onClick: t.onOpen,
								"data-testid": `${a}-work-item`,
								className: "flex w-full items-center gap-2 rounded-md border border-border p-2 text-left hover:border-border-emphasis focus-visible:outline-2 focus-visible:outline-primary",
								children: n
							}) : /* @__PURE__ */ X("div", {
								"data-testid": `${a}-work-item`,
								className: "flex items-center gap-2 rounded-md border border-border p-2",
								children: n
							}), !!t.tags.length && /* @__PURE__ */ X("div", {
								className: "flex flex-wrap gap-1.5",
								children: t.tags.map((e) => /* @__PURE__ */ X(s, {
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
var dr = {
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
function fr({ banner: e }) {
	let n = dr[e.tone];
	return /* @__PURE__ */ Z("div", {
		role: "status",
		className: t("flex gap-2 rounded-md border p-2.5", n.card),
		"data-testid": "work-pane-banner",
		"data-tone": e.tone,
		children: [/* @__PURE__ */ X("span", {
			"aria-hidden": "true",
			className: t("mt-1.5 h-2 w-2 shrink-0 rounded-full", n.dot)
		}), /* @__PURE__ */ Z("span", {
			className: "min-w-0",
			children: [/* @__PURE__ */ X("span", {
				className: t("block text-[13px] font-semibold", n.title),
				children: e.title
			}), e.description && /* @__PURE__ */ X("span", {
				className: "block text-xs text-text-secondary",
				children: e.description
			})]
		})]
	});
}
function pr({ label: e, children: t }) {
	return /* @__PURE__ */ Z("section", {
		className: "space-y-1.5",
		children: [/* @__PURE__ */ X("h3", {
			className: "text-[10px] font-semibold uppercase tracking-wide text-text-tertiary",
			children: e
		}), t]
	});
}
function mr({ item: e, onSelect: t }) {
	let n = /* @__PURE__ */ Z(Y, { children: [
		/* @__PURE__ */ X("span", {
			"aria-hidden": "true",
			className: "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded bg-info-bg text-[11px] text-info-fg",
			children: "▤"
		}),
		/* @__PURE__ */ Z("span", {
			className: "min-w-0 flex-1",
			children: [/* @__PURE__ */ X("span", {
				className: "block truncate text-[13px] font-medium text-text-primary",
				children: e.title
			}), e.meta && /* @__PURE__ */ X("span", {
				className: "block truncate text-xs text-text-tertiary",
				children: e.meta
			})]
		}),
		e.selection && t && /* @__PURE__ */ X("span", {
			"aria-hidden": "true",
			className: "shrink-0 text-text-tertiary",
			children: "↗"
		})
	] });
	return !e.selection || !t ? /* @__PURE__ */ X("div", {
		className: "flex gap-2 rounded-md border border-border p-2",
		children: n
	}) : /* @__PURE__ */ X("button", {
		type: "button",
		className: "flex w-full gap-2 rounded-md border border-border p-2 text-left hover:border-border-emphasis focus-visible:outline-2 focus-visible:outline-primary",
		onClick: () => t(e.selection),
		children: n
	});
}
function hr({ transcript: e, onSelect: t }) {
	let n = ye(), [r, i] = J("transcript"), a = e.ask;
	return /* @__PURE__ */ Z("div", {
		className: "space-y-3",
		"data-testid": "work-transcript-panel",
		children: [
			/* @__PURE__ */ X(v, {
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
			/* @__PURE__ */ Z(b, {
				idPrefix: n,
				id: "transcript",
				when: r,
				className: "space-y-3",
				children: [e.segments.map((e) => /* @__PURE__ */ Z("div", {
					className: "space-y-0.5",
					children: [/* @__PURE__ */ Z("p", {
						className: "flex items-baseline gap-2 text-xs",
						children: [/* @__PURE__ */ X("span", {
							className: "tabular-nums text-text-tertiary",
							children: e.at
						}), /* @__PURE__ */ X("span", {
							className: "font-semibold text-text-primary",
							children: e.speaker
						})]
					}), /* @__PURE__ */ X("p", {
						className: "text-[13px] leading-snug text-text-secondary",
						children: e.text
					})]
				}, e.id)), !e.segments.length && /* @__PURE__ */ X("p", {
					className: "text-sm text-text-secondary",
					children: "No transcript rows are shared with you."
				})]
			}),
			a && /* @__PURE__ */ X(b, {
				idPrefix: n,
				id: "ask",
				when: r,
				children: /* @__PURE__ */ X(gr, {
					ask: a,
					onSelect: t
				})
			})
		]
	});
}
function gr({ ask: e, onSelect: t }) {
	let [r, i] = J(""), [a, o] = J(null), [s, c] = J(null), [l, u] = J(!1);
	if (!e.enabled) return /* @__PURE__ */ X("p", {
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
	return /* @__PURE__ */ Z("div", {
		className: "space-y-2",
		children: [
			/* @__PURE__ */ X("label", {
				className: "block text-xs text-text-secondary",
				htmlFor: "work-ask-input",
				children: "Ask this transcript"
			}),
			/* @__PURE__ */ Z("div", {
				className: "flex gap-1.5",
				children: [/* @__PURE__ */ X(S, {
					id: "work-ask-input",
					size: "sm",
					className: "flex-1",
					placeholder: e.placeholder ?? "Anything for me?",
					value: r,
					onChange: (e) => i(e.target.value),
					onKeyDown: (e) => {
						e.key === "Enter" && d();
					}
				}), /* @__PURE__ */ X(n, {
					size: "sm",
					variant: "primary",
					disabled: l || !r.trim(),
					onClick: () => void d(),
					children: "Ask"
				})]
			}),
			s && /* @__PURE__ */ X("p", {
				role: "status",
				className: "text-xs text-danger-fg",
				children: s
			}),
			a && /* @__PURE__ */ Z("div", {
				className: "space-y-2 rounded-md border border-border p-2.5",
				"data-testid": "work-ask-answer",
				children: [
					/* @__PURE__ */ X("p", {
						className: "text-[13px] leading-snug text-text-primary",
						children: a.text
					}),
					!!a.citations?.length && /* @__PURE__ */ X("div", {
						className: "flex flex-wrap gap-1.5",
						children: a.citations.map((e) => e.selection && t ? /* @__PURE__ */ Z(n, {
							size: "sm",
							variant: "secondary",
							onClick: () => t(e.selection),
							children: [e.label, " ↗"]
						}, e.id) : /* @__PURE__ */ X(yr, { children: e.label }, e.id))
					}),
					a.note && /* @__PURE__ */ X("p", {
						className: "text-[11px] text-text-tertiary",
						children: a.note
					})
				]
			})
		]
	});
}
function _r(e) {
	return e.replace(/\s+/g, " ").trim().toLowerCase();
}
function vr(e, t) {
	let n = _r(e);
	return !n || t.some((e) => !!e && (_r(e) === n || n.length >= 8 && _r(e).includes(n)));
}
function yr({ children: e, title: t, tone: n }) {
	return /* @__PURE__ */ X(s, {
		size: "sm",
		className: "max-w-full min-w-0",
		...t ? { title: t } : {},
		...n ? { tone: n } : {},
		children: /* @__PURE__ */ X("span", {
			className: "min-w-0 truncate",
			children: e
		})
	});
}
function br({ node: e, detail: r, selection: i, onSelectionChange: a, onClose: o, onOpen: s, onReference: c, live: u, headerAccessory: d, className: f, "data-testid": p = "activity-inspector" }) {
	let h = e.locked || e.disclosure === "existence", g = h ? void 0 : r, _ = e.locked ? "Restricted work item" : e.title, v = g?.sections, y = g?.artifact ? Yn(g.artifact, i) : void 0, b = y?.revision ? {
		...i,
		revisionId: y.revision.id,
		anchorId: y.slide?.id ?? i.anchorId ?? y.revision.anchorId
	} : { ...i }, x = g?.compute, S = g?.banner?.description && vr(g.banner.description, [_, g.subtitle]) ? {
		tone: g.banner.tone,
		title: g.banner.title
	} : g?.banner, C = S && vr(S.title, [_]) ? S.description ? {
		tone: S.tone,
		title: S.description
	} : void 0 : S, w = !h && !!u && e.status === "running" && g?.fresh !== !0, T = w ? g?.subtitle ? `${g.subtitle} · updates delayed` : "Running · updates delayed" : g?.subtitle, E = !!x || !!g?.artifact || !!g?.transcript, D = [
		C?.title,
		C?.description,
		v?.description,
		g?.subtitle,
		g?.excerpt
	], O = E ? [] : (g?.lines ?? []).filter((e, t, n) => n.indexOf(e) === t && !vr(e, D)), k = E ? void 0 : g?.excerpt, A = g?.actions ?? [], j = !!s && !!y?.revision && (e.capabilities.includes("view-document") || e.capabilities.includes("edit-document")), ee = !x && !C && !g?.artifact && !g?.transcript && !v && !g?.note && !g?.actions?.length && !k && O.length === 0;
	return /* @__PURE__ */ Z("section", {
		"aria-label": _,
		"data-testid": p,
		className: t("flex h-full min-h-0 flex-col border-l border-border bg-surface", f),
		onKeyDown: (e) => {
			e.key === "Escape" && !e.defaultPrevented && (e.stopPropagation(), o());
		},
		children: [
			/* @__PURE__ */ Z("header", {
				className: "flex shrink-0 items-start justify-between gap-2 border-b border-border px-3 py-2",
				children: [/* @__PURE__ */ Z("span", {
					className: "flex min-w-0 flex-col",
					children: [/* @__PURE__ */ X("span", {
						className: "truncate text-sm font-semibold text-text-primary",
						"data-testid": `${p}-title`,
						children: _
					}), T && /* @__PURE__ */ X("span", {
						className: "truncate text-xs text-text-tertiary",
						"data-testid": `${p}-subtitle`,
						...w ? { "data-delayed": "true" } : {},
						children: T
					})]
				}), /* @__PURE__ */ Z("span", {
					className: "flex shrink-0 items-center gap-2",
					children: [d != null && /* @__PURE__ */ X("span", {
						className: "flex items-center",
						"data-testid": `${p}-accessory`,
						children: d
					}), /* @__PURE__ */ X(l, {
						size: "md",
						"aria-label": "Close details",
						onClick: o,
						"data-testid": `${p}-close`,
						className: "shrink-0",
						children: /* @__PURE__ */ X(m, {})
					})]
				})]
			}),
			/* @__PURE__ */ Z("div", {
				className: "min-h-0 flex-1 space-y-4 overflow-auto p-3",
				children: [
					!x && C && /* @__PURE__ */ X(fr, { banner: C }),
					x && /* @__PURE__ */ X(ur, {
						compute: x,
						...C ? { banner: C } : {}
					}),
					k && /* @__PURE__ */ X("p", {
						className: "text-[13px] italic leading-snug text-text-primary",
						"data-testid": `${p}-excerpt`,
						children: `“${k}”`
					}),
					O.length > 0 && /* @__PURE__ */ X("ul", {
						className: "space-y-0.5 text-[13px] leading-snug text-text-secondary",
						"data-testid": `${p}-lines`,
						children: O.map((e, t) => /* @__PURE__ */ X("li", { children: e }, `${t}-${e}`))
					}),
					v?.description && /* @__PURE__ */ X("p", {
						className: "text-[13px] leading-snug text-text-secondary",
						children: v.description
					}),
					g?.artifact && /* @__PURE__ */ X(Xn, {
						node: e,
						artifact: g.artifact,
						selection: i,
						onSelectionChange: a,
						quiet: !!g.banner
					}),
					g?.transcript && /* @__PURE__ */ X(hr, {
						transcript: g.transcript,
						onSelect: a
					}),
					!!v?.inputs?.length && /* @__PURE__ */ X(pr, {
						label: "Inputs",
						children: /* @__PURE__ */ X("div", {
							className: "flex flex-wrap gap-1.5",
							children: v.inputs.map((e, t) => typeof e == "string" ? /* @__PURE__ */ X(yr, { children: e }, `${t}-${e}`) : /* @__PURE__ */ X(yr, {
								title: e.meta,
								children: e.title
							}, e.id))
						})
					}),
					!!v?.tools?.length && /* @__PURE__ */ X(pr, {
						label: "Tools in this run",
						children: /* @__PURE__ */ X("div", {
							className: "flex flex-wrap gap-1.5",
							children: v.tools.map((e, t) => /* @__PURE__ */ X(yr, {
								tone: "info",
								children: e
							}, `${t}-${e}`))
						})
					}),
					!!v?.sources?.length && /* @__PURE__ */ X(pr, {
						label: "Sources used",
						children: /* @__PURE__ */ X("div", {
							className: "space-y-1.5",
							children: v.sources.map((e) => /* @__PURE__ */ X(mr, {
								item: e,
								onSelect: a
							}, e.id))
						})
					}),
					v?.workItem && /* @__PURE__ */ X(pr, {
						label: "Work item",
						children: /* @__PURE__ */ X(mr, {
							item: v.workItem,
							onSelect: a
						})
					}),
					g?.note && /* @__PURE__ */ X("p", {
						className: "text-xs leading-snug text-text-tertiary",
						children: g.note
					}),
					ee && /* @__PURE__ */ X("p", {
						className: "text-sm text-text-secondary",
						children: h ? "Only the existence of this work is shared with you." : "No further detail is shared with you."
					})
				]
			}),
			(j || A.length > 0 || c && !h) && /* @__PURE__ */ Z("div", {
				className: "shrink-0 space-y-2 border-t border-border p-2",
				"data-testid": `${p}-footer`,
				children: [(j || A.length > 0) && /* @__PURE__ */ Z("div", {
					className: "grid gap-2",
					"data-testid": `${p}-actions`,
					children: [j && /* @__PURE__ */ X(n, {
						size: "sm",
						variant: "primary",
						fullWidth: !0,
						onClick: () => s(b),
						children: "Open presentation"
					}), A.map((e) => /* @__PURE__ */ X(n, {
						size: "sm",
						variant: "secondary",
						fullWidth: !0,
						onClick: () => {
							e.onSelect?.(), e.selection && a(e.selection);
						},
						children: e.label
					}, e.id))]
				}), c && !h && /* @__PURE__ */ X(n, {
					size: "sm",
					variant: "secondary",
					fullWidth: !0,
					onClick: () => c(b),
					children: "Reference in chat"
				})]
			})
		]
	});
}
//#endregion
//#region src/components/forms/RangeSlider.tsx
function xr({ value: e, min: n, max: r, step: i = 1, minDistance: a = i, labels: o, formatValue: s, onChange: c, className: l }) {
	let u = ye(), d = Math.max(1, r - n), f = (e) => Math.max(n, Math.min(r, e)), p = f(e[0]), m = Math.max(p, f(e[1])), h = Math.min(a, r - n);
	return /* @__PURE__ */ Z("div", {
		className: t("relative h-7 min-w-0", l),
		children: [
			/* @__PURE__ */ X("div", { className: "absolute inset-x-0 top-3 h-1 rounded-full bg-surface-inset" }),
			/* @__PURE__ */ X("div", {
				className: "absolute top-3 h-1 rounded-full bg-primary/30",
				style: {
					left: `${(p - n) / d * 100}%`,
					right: `${(r - m) / d * 100}%`
				}
			}),
			[0, 1].map((e) => /* @__PURE__ */ X("input", {
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
var Sr = 6e4, Cr = 60 * Sr, wr = [
	[2 * Cr, 30 * Sr],
	[6 * Cr, Cr],
	[12 * Cr, 2 * Cr],
	[Infinity, 3 * Cr]
], Tr = 80, Er = 44;
function Dr({ activity: e, timezone: r = "UTC" }) {
	let { bounds: i, window: a, onWindowChange: o } = e, s = Math.max(Sr, a.end - a.start), c = new Intl.DateTimeFormat(void 0, {
		timeZone: r,
		hour: "numeric",
		minute: "2-digit"
	}), u = (e) => c.format(e), d = new Intl.DateTimeFormat("en-GB", {
		timeZone: r,
		hour: "2-digit",
		minute: "2-digit",
		hourCycle: "h23"
	}), f = (e) => {
		let t = d.formatToParts(e), n = t.find((e) => e.type === "hour")?.value ?? "0", r = t.find((e) => e.type === "minute")?.value ?? "00";
		return `${Number(n)}:${r}`;
	}, p = e.now ?? (a.following ? a.end : Date.now()), m = e.temporalMode === "recent" || a.following ? Math.min(i.end, Math.max(i.start + Sr, p)) : i.end, h = Math.max(1, m - i.start), g = (e) => Math.min(100, Math.max(0, (e - i.start) / h * 100)), _ = (e, t, n = s) => {
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
	].find((e) => s === e * Sr), y = a.start === i.start && a.end >= m, b = a.end >= m, x = [Math.min(Math.max(a.start, i.start), m), Math.min(Math.max(a.end, i.start), m)], S = wr.find(([e]) => h <= e)[1], w = se(), T = w.width ?? 0, E = [];
	for (let e = Math.ceil(i.start / S) * S; e <= m; e += S) {
		let t = (e - i.start) / h;
		if (!(t >= .82)) {
			if (T > 0) {
				if ((1 - t) * T < Tr) continue;
				let n = E[E.length - 1];
				if (n !== void 0 && (e - n) / h * T < Er) continue;
			}
			E.push(e);
		}
	}
	return /* @__PURE__ */ Z("div", {
		className: "shrink-0 border-b border-border bg-surface px-3 pb-3 pt-2",
		"aria-label": "Work time window",
		children: [
			/* @__PURE__ */ Z("div", {
				className: "flex flex-wrap items-center gap-1.5 text-xs text-text-secondary",
				children: [
					/* @__PURE__ */ Z("strong", {
						"aria-live": "polite",
						title: r,
						className: "tabular-nums font-semibold text-text-primary",
						children: [
							f(x[0]),
							" – ",
							b ? "Now" : f(x[1])
						]
					}),
					/* @__PURE__ */ X("span", { className: "flex-1" }),
					/* @__PURE__ */ X(l, {
						size: "sm",
						"aria-label": "Previous interval",
						disabled: a.start <= i.start,
						onClick: () => _(a.end - s, !1),
						children: "‹"
					}),
					/* @__PURE__ */ X(l, {
						size: "sm",
						"aria-label": "Next interval",
						disabled: b,
						onClick: () => _(a.end + s, !1),
						children: "›"
					}),
					/* @__PURE__ */ Z(n, {
						size: "sm",
						variant: "secondary",
						disabled: a.following,
						onClick: () => _(m, !0),
						children: [/* @__PURE__ */ X("span", {
							"aria-hidden": "true",
							className: t("mr-1 inline-block h-1.5 w-1.5 rounded-full align-middle", a.following ? "bg-success" : "bg-border-emphasis")
						}), a.following ? "Following now" : "Back to now"]
					}),
					/* @__PURE__ */ X(C, {
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
						onChange: (e) => _(a.end, a.following, e.target.value === "day" ? h : Number(e.target.value) * Sr)
					})
				]
			}),
			/* @__PURE__ */ Z("div", {
				ref: w.ref,
				className: "relative mx-1 mt-2 h-4 text-[12px] text-text-tertiary",
				"aria-hidden": "true",
				"data-testid": "work-time-ruler",
				children: [E.map((e) => /* @__PURE__ */ X("span", {
					className: "absolute top-0 -translate-x-1/2 first:translate-x-0 tabular-nums",
					style: { left: `${g(e)}%` },
					children: f(e)
				}, e)), /* @__PURE__ */ Z("span", {
					className: "absolute right-0 top-0 font-semibold tabular-nums text-text-secondary",
					children: ["Now ", f(m)]
				})]
			}),
			/* @__PURE__ */ X("div", {
				className: "relative mx-1 h-3 border-b border-border",
				"aria-label": "Activity markers",
				children: e.events?.filter((e) => e.at >= i.start && e.at <= m && e.count > 0).map((e) => {
					let n = e.at >= x[0] && e.at <= x[1];
					return /* @__PURE__ */ X("button", {
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
			/* @__PURE__ */ X(xr, {
				className: "mx-1",
				value: x,
				min: i.start,
				max: m,
				step: Sr,
				labels: ["Interval start", "Interval end"],
				formatValue: u,
				onChange: ([e, t]) => o({
					start: e,
					end: t,
					following: !1
				})
			}),
			!a.following && e.temporalMode === "recent" && /* @__PURE__ */ X("p", {
				className: "text-xs text-text-secondary",
				children: "Recent work · statuses reflect the latest available state"
			})
		]
	});
}
//#endregion
//#region src/components/graph/work/WorkActivityGraph.tsx
var Or = 820, kr = 720;
function Ar(e) {
	let { nodes: r, edges: i, selection: a, activity: o, onSelectionChange: s, onMaxEffortsChange: c } = e, l = q(null), u = q(null), d = q(null), [f, p] = J(!1), [m, h] = J(!0), [g, _] = J(!1), [v, y] = J(null), [b, x] = J(e.maxEfforts ?? 2), S = c ? e.maxEfforts ?? 2 : b, C = (e) => {
		if (!c) {
			x(e);
			return;
		}
		c(e);
	}, w = a?.kind === "node" ? a.id : null, T = o.view.focusedEffortId ?? null, E = T ?? (w ? o.efforts.find((e) => e.nodeIds.includes(w))?.id ?? null : null), D = yn(o.efforts, r, {
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
	let ee = j ? i.filter((e) => j.has(e.id)) : i, M = (T ? 0 : o.efforts.length - O) > 0 ? /* @__PURE__ */ Z("div", {
		className: "flex flex-wrap items-center justify-between gap-2 border-t border-border pt-2 text-xs text-text-tertiary",
		"data-testid": "work-activity-list-more",
		children: [/* @__PURE__ */ Z("span", { children: [
			"Showing ",
			O,
			" of ",
			o.efforts.length,
			" activities · Newest work first"
		] }), /* @__PURE__ */ Z(n, {
			size: "sm",
			variant: "secondary",
			onClick: () => C(0),
			children: [
				"Show all ",
				o.efforts.length,
				" activities"
			]
		})]
	}) : void 0, N = (e) => At(e.status, o.details?.[e.id]?.pause), P = /* @__PURE__ */ X(Wt, {
		...e,
		edges: ee,
		groups: A,
		footer: M,
		statusLabelOf: N
	}), te = a?.kind === "node" ? r.find((e) => e.id === a.id) : void 0, F = a?.kind === "edge" ? i.find((e) => e.id === a.id && r.some((t) => t.id === e.fromId) && r.some((t) => t.id === e.toId)) : void 0, I = !!(te || F), { window: L, bounds: ne, onWindowChange: R, onEarlier: re } = o, z = o.detailsPlacement ?? "auto", ie = z === "overlay" || z === "auto" && !m;
	G(() => {
		a && !I && s(null);
	}, [
		a,
		I,
		s
	]), G(() => {
		a && l.current?.contains(document.activeElement) && document.activeElement instanceof HTMLElement && !document.activeElement.closest("[data-testid=\"activity-inspector\"]") && (d.current = document.activeElement);
	}, [a]);
	let B = q(!1);
	G(() => {
		if (a) {
			B.current = !0;
			return;
		}
		if (!B.current) return;
		B.current = !1;
		let e = d.current;
		e && requestAnimationFrame(() => {
			let t = document.activeElement;
			e.isConnected && (!t || t === document.body) && e.focus({ preventScroll: !0 });
		});
	}, [a]), G(() => {
		let e = u.current;
		if (!e || typeof ResizeObserver > "u") return;
		let t = new ResizeObserver(([e]) => h(e.contentRect.width >= Or));
		return t.observe(e), () => t.disconnect();
	}, []), G(() => {
		let e = l.current;
		if (!e || typeof ResizeObserver > "u") return;
		let t = new ResizeObserver(([e]) => _(e.contentRect.height < kr));
		return t.observe(e), () => t.disconnect();
	}, []);
	let ae = () => {
		s(null), requestAnimationFrame(() => {
			d.current?.isConnected && d.current.focus();
		});
	}, oe = () => {
		if (re) {
			re();
			return;
		}
		let e = Math.max(6e4, L.end - L.start), t = Math.max(ne.start, L.start - e);
		R({
			start: t,
			end: t + e,
			following: !1
		});
	}, se = I, ce = a ? `${a.kind}:${a.id}` : null, V = se && e.viewport.zoom < .4 && v !== ce, H = V || f && g, le = f && !H, U = H || le, de = () => {
		if (!U) {
			p(!0);
			return;
		}
		p(!1), V && y(ce);
	}, fe = Ve().right, pe = fe > 0 ? { paddingRight: fe } : void 0, me = ie ? "absolute inset-y-0 right-0 z-10 w-[min(340px,85%)] shadow-lg" : "w-[340px] max-w-[45%] shrink-0";
	return /* @__PURE__ */ Z("section", {
		ref: l,
		"aria-label": "Shared work graph",
		className: t("flex h-full min-h-0 min-w-0 flex-col bg-surface", e.className),
		onKeyDown: (e) => {
			e.key === "Escape" && a && (e.stopPropagation(), ae());
		},
		children: [
			o.title && /* @__PURE__ */ X(Kn, {
				title: o.title,
				subtitle: o.subtitle,
				expanded: o.expanded ?? o.mode === "full",
				onExpand: o.onExpand,
				onPopOut: o.onPopOut,
				onClose: o.onClose,
				effortCount: o.efforts.length,
				maxEfforts: S,
				onMaxEffortsChange: C,
				viewNote: o.viewNote,
				actions: o.headerActions || o.kindLegend ? /* @__PURE__ */ Z(Y, { children: [o.headerActions, o.kindLegend && /* @__PURE__ */ X(Jn, {
					nodes: r,
					edges: i
				})] }) : void 0
			}),
			e.state === "partial" && /* @__PURE__ */ X("p", {
				role: "status",
				className: "border-b border-warning-border bg-warning-bg px-3 py-1 text-xs text-warning-fg",
				children: "Some work sources are delayed or unavailable."
			}),
			/* @__PURE__ */ Z("div", {
				ref: u,
				className: "relative flex min-h-0 min-w-0 flex-1",
				children: [/* @__PURE__ */ Z("div", {
					className: "flex min-h-0 min-w-0 flex-1 flex-col",
					children: [
						/* @__PURE__ */ X("div", {
							style: pe,
							"data-testid": "work-activity-time-window-frame",
							children: /* @__PURE__ */ X(Dr, {
								activity: o,
								timezone: e.timezone
							})
						}),
						/* @__PURE__ */ Z("div", {
							className: "relative flex min-h-0 flex-1 flex-col overflow-hidden",
							"data-testid": "work-activity-region",
							"data-list": H ? "region" : void 0,
							children: [/* @__PURE__ */ X("div", {
								className: t("flex min-h-0 flex-1 flex-col", H && "invisible"),
								"aria-hidden": H || void 0,
								inert: H || void 0,
								children: /* @__PURE__ */ X(Vn, {
									...e,
									maxEfforts: S,
									onViewAsList: () => p(!0)
								})
							}), H && /* @__PURE__ */ X("div", {
								className: "absolute inset-0 overflow-auto bg-surface p-3",
								"data-testid": "work-activity-list-region",
								children: P
							})]
						}),
						/* @__PURE__ */ Z("div", {
							className: "@container flex h-9 shrink-0 items-center justify-between gap-2 border-t border-border px-4 text-[12px] text-text-tertiary",
							style: fe > 0 ? { paddingRight: fe + 16 } : void 0,
							"data-testid": "work-activity-footer",
							children: [o.view.focusedEffortId ? /* @__PURE__ */ X(n, {
								size: "sm",
								variant: "ghost",
								onClick: () => o.onViewChange({
									...o.view,
									focusedEffortId: null
								}),
								children: "← All activities"
							}) : /* @__PURE__ */ Z("span", { children: [O < o.efforts.length ? `Showing ${O} of ${o.efforts.length} parallel activities` : `${o.efforts.length} parallel activities`, " · Newest work first"] }), /* @__PURE__ */ Z("span", {
								className: "ml-auto flex items-center gap-3",
								children: [!H && /* @__PURE__ */ X(Hn, { live: o.window.following }), /* @__PURE__ */ X(n, {
									size: "sm",
									variant: "ghost",
									disabled: L.start <= ne.start,
									onClick: oe,
									children: "← Earlier work"
								})]
							})]
						})
					]
				}), z !== "none" && I && (te && a?.kind === "node" ? /* @__PURE__ */ X(br, {
					node: te,
					detail: o.details?.[te.id],
					selection: a,
					onSelectionChange: s,
					onClose: ae,
					onOpen: e.onOpen,
					onReference: e.onReference,
					className: me
				}) : /* @__PURE__ */ X(ue, {
					title: F?.label || "Relationship",
					onClose: ae,
					className: me,
					"data-testid": "activity-inspector",
					children: /* @__PURE__ */ X(Yt, { ...e })
				}))]
			}),
			/* @__PURE__ */ X("div", {
				className: "shrink-0 border-t border-border px-2 py-1",
				children: /* @__PURE__ */ X(n, {
					size: "sm",
					variant: "ghost",
					"aria-expanded": U,
					onClick: de,
					"data-testid": "work-activity-list-toggle",
					children: V ? "Show the graph" : U ? "Hide accessible list" : "View as accessible list"
				})
			}),
			le && /* @__PURE__ */ X("div", {
				className: "max-h-60 min-h-0 shrink-0 overflow-auto border-t border-border p-3",
				"data-testid": "work-activity-list-below",
				children: P
			})
		]
	});
}
//#endregion
//#region src/components/graph/work/WorkGraph.tsx
var jr = 328, Mr = 224, Nr = {
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
function Pr(e) {
	return e.locked ? "Restricted work item" : e.title.trim() || "Untitled work item";
}
function Fr({ data: e }) {
	return /* @__PURE__ */ Z("div", {
		className: "w-[248px]",
		children: [
			/* @__PURE__ */ X(Q, {
				type: "target",
				position: $.Left,
				isConnectable: !1,
				className: "opacity-0"
			}),
			/* @__PURE__ */ X(Lt, {
				node: e.entity,
				selected: e.selected,
				onSelect: e.onSelect,
				onOpen: e.onOpen
			}),
			/* @__PURE__ */ X(Q, {
				type: "source",
				position: $.Right,
				isConnectable: !1,
				className: "opacity-0"
			})
		]
	});
}
function Ir({ id: t, sourceX: n, sourceY: r, targetX: i, targetY: a, sourcePosition: o, targetPosition: s, markerEnd: c, data: l }) {
	let u = e(), [d, f, p] = Oe({
		sourceX: n,
		sourceY: r,
		targetX: i,
		targetY: a,
		sourcePosition: o,
		targetPosition: s
	});
	if (!l) return null;
	let m = l.entity.status === "running" && !l.entity.endedAt;
	return /* @__PURE__ */ Z(Y, { children: [
		/* @__PURE__ */ X(Se, {
			id: t,
			path: d,
			markerEnd: c,
			interactionWidth: 24,
			className: l.selected ? "stroke-primary" : "stroke-border-emphasis"
		}),
		m && !u ? /* @__PURE__ */ X("circle", {
			r: "4",
			className: "fill-primary",
			"aria-hidden": "true",
			"data-testid": `work-edge-motion-${l.entity.id}`,
			children: /* @__PURE__ */ X("animateMotion", {
				dur: "2s",
				repeatCount: "indefinite",
				path: d
			})
		}) : null,
		/* @__PURE__ */ X("foreignObject", {
			x: f - 104,
			y: p - 40,
			width: "208",
			height: "80",
			className: "overflow-visible",
			children: /* @__PURE__ */ X("div", {
				className: "nodrag nopan w-52",
				"data-work-edge-label": l.entity.id,
				children: /* @__PURE__ */ X(zt, {
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
var Lr = { work: Fr }, Rr = { work: Ir };
function zr(e, t) {
	let n = new Set(e.map((e) => e.id)), r = new Map(e.map((e) => [e.id, 0])), i = new Map(e.map((e) => [e.id, []]));
	for (let e of t) !n.has(e.fromId) || !n.has(e.toId) || e.fromId === e.toId || (i.get(e.fromId)?.push(e.toId), r.set(e.toId, (r.get(e.toId) ?? 0) + 1));
	let a = /* @__PURE__ */ new Map(), o = e.filter((e) => r.get(e.id) === 0).sort(Br).map((e) => e.id);
	for (let e of o) a.set(e, 0);
	for (let e = 0; e < o.length; e += 1) {
		let t = o[e], n = (a.get(t) ?? 0) + 1;
		for (let e of (i.get(t) ?? []).sort()) a.set(e, Math.max(a.get(e) ?? 0, n)), r.set(e, (r.get(e) ?? 1) - 1), r.get(e) === 0 && o.push(e);
	}
	for (let t of [...e].sort(Br)) a.has(t.id) || a.set(t.id, Nr[t.kind] % 4);
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
			return n(e.id) - n(t.id) || Br(e, t);
		}), t.forEach((t, n) => {
			u.set(t.id, n), c.set(t.id, {
				x: 48 + e * jr,
				y: 48 + n * Mr
			});
		});
	}
	return c;
}
function Br(e, t) {
	return Nr[e.kind] - Nr[t.kind] || e.id.localeCompare(t.id);
}
function Vr(e, t, n) {
	return e ? e.kind === "node" ? t.some((t) => t.id === e.id) : n.some((t) => t.id === e.id) : !1;
}
function Hr({ state: e, errorMessage: t, onRetry: r }) {
	return e === "loading" ? /* @__PURE__ */ X("div", {
		role: "status",
		"data-testid": "work-graph-loading",
		className: "flex min-h-[22rem] items-center justify-center rounded-lg border border-border bg-surface text-sm text-text-secondary",
		children: "Loading shared work…"
	}) : e === "error" ? /* @__PURE__ */ X(T, {
		testId: "work-graph-error",
		icon: "!",
		title: "Shared work is unavailable",
		description: t || "The work graph could not be loaded.",
		action: r ? /* @__PURE__ */ X(n, {
			onClick: r,
			children: "Try again"
		}) : void 0
	}) : /* @__PURE__ */ X(T, {
		testId: "work-graph-empty",
		icon: "○",
		title: "No shared work",
		description: "There is no shared work available for this day."
	});
}
function Ur({ nodes: e, edges: n, selection: r, viewport: i, day: a, timezone: o, sources: s = [], state: c = "ready", errorMessage: l, className: u, onSelectionChange: d, onViewportChange: f, onRetry: p, onOpen: m, onReference: h, onRequestCollaboration: g }) {
	let _ = K(() => new Set(e.map((e) => e.id)), [e]), v = K(() => n.filter((e) => _.has(e.fromId) && _.has(e.toId)), [n, _]), y = Vr(r, e, v) ? r : null;
	G(() => {
		r && !y && d(null);
	}, [
		y,
		d,
		r
	]);
	let b = zr(e.map((e) => ({
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
			fromLabel: Pr(x.get(e.fromId)),
			toLabel: Pr(x.get(e.toId)),
			onSelect: (e) => d({
				kind: "edge",
				id: e
			})
		}
	}));
	if (c === "loading" || c === "error" || c === "empty" || e.length === 0) return /* @__PURE__ */ X("section", {
		"aria-label": "Shared work graph",
		className: t("min-w-0", u),
		children: /* @__PURE__ */ X(Hr, {
			state: c === "ready" ? "empty" : c,
			errorMessage: l,
			onRetry: p
		})
	});
	let w = s.filter((e) => e.health !== "available");
	return /* @__PURE__ */ Z("section", {
		"aria-label": "Shared work graph",
		className: t("min-w-0 space-y-4", u),
		"data-state": c,
		children: [
			c === "partial" ? /* @__PURE__ */ Z("div", {
				role: "status",
				"data-testid": "work-graph-partial",
				className: "rounded-lg border border-warning-border bg-warning-bg px-3 py-2 text-sm text-warning-fg",
				children: [/* @__PURE__ */ X("p", {
					className: "font-medium",
					children: "Some work sources are unavailable or delayed."
				}), w.length > 0 ? /* @__PURE__ */ X("ul", {
					className: "mt-1 list-disc pl-5 text-xs",
					children: w.map((e) => /* @__PURE__ */ X("li", { children: e.message || `${e.source} is ${e.health}.` }, e.source))
				}) : null]
			}) : null,
			a ? /* @__PURE__ */ X(ln, {
				day: a,
				timezone: o || "UTC",
				nodes: e,
				edges: v,
				selection: y,
				onSelectionChange: d
			}) : null,
			/* @__PURE__ */ Z("div", {
				className: "grid min-w-0 grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_20rem]",
				"data-testid": "work-graph-layout",
				children: [/* @__PURE__ */ X("div", {
					className: "relative h-[clamp(22rem,55vh,42rem)] min-w-0 overflow-hidden rounded-lg border border-border bg-surface",
					"data-testid": "work-graph-canvas",
					children: /* @__PURE__ */ Z(Ee, {
						nodes: S,
						edges: C,
						nodeTypes: Lr,
						edgeTypes: Rr,
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
						children: [/* @__PURE__ */ X(xe, {
							gap: 20,
							size: 1,
							color: "var(--color-border)"
						}), /* @__PURE__ */ X(Ce, { showInteractive: !1 })]
					})
				}), /* @__PURE__ */ X(Yt, {
					nodes: e,
					edges: v,
					selection: y,
					onSelectionChange: d,
					onOpen: m,
					onReference: h,
					onRequestCollaboration: g
				})]
			}),
			/* @__PURE__ */ X(Wt, {
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
function Wr(e) {
	return e.activity && e.nodes.length > 0 && e.state !== "loading" && e.state !== "error" && e.state !== "empty" ? /* @__PURE__ */ X(Ar, {
		...e,
		activity: e.activity
	}) : /* @__PURE__ */ X(Ur, { ...e });
}
var Gr = 40, Kr = 16 / 9, qr = (e, t, n) => Math.min(n, Math.max(t, e));
function Jr(e, t, n) {
	let r = Math.max(1, e), i = Math.max(1, t), a = Math.max(1, n), o = Math.sqrt(i * a / r), s = qr(o * .7, 60, 240), c = -qr(o * o / 70, 150, 1500);
	if (r > Gr) {
		let e = i / a / Kr;
		return {
			linkDistance: s,
			linkStiffness: .3,
			charge: c,
			collidePadding: 6,
			xStrength: qr(.1 / e, .03, .2),
			yStrength: qr(.1 * e, .03, .3),
			jitter: 50
		};
	}
	let l = .09, u = i / a;
	return {
		linkDistance: s,
		linkStiffness: .03,
		charge: c,
		collidePadding: 18,
		xStrength: qr(l / u, .01, .3),
		yStrength: qr(l * u, .01, .3),
		jitter: Math.min(s, 150)
	};
}
function Yr(e, t) {
	let n = (2166136261 ^ t) >>> 0;
	for (let t = 0; t < e.length; t++) n = Math.imul(n ^ e.charCodeAt(t), 16777619) >>> 0;
	return n ^= n >>> 16, n = Math.imul(n, 2246822507) >>> 0, n ^= n >>> 13, n = Math.imul(n, 3266489909) >>> 0, n ^= n >>> 16, (n >>> 0) / 4294967296;
}
var Xr = (e) => 15 + e.influenceScore * 20;
function Zr({ people: e, relationships: t, departments: n, width: r, height: i, nodeRadiusOf: a = Xr }) {
	let o = Jr(e.length, r, i), s = Qr(n.map((e) => e.name), r, i), c = e.map((e) => {
		let t = s.get(e.department) ?? {
			x: r / 2,
			y: i / 2
		};
		return {
			...e,
			x: t.x + (Yr(e.id, 0) - .5) * 2 * o.jitter,
			y: t.y + (Yr(e.id, 1) - .5) * 2 * o.jitter
		};
	}), l = new Set(e.map((e) => e.id)), u = t.filter((e) => l.has(e.source) && l.has(e.target)).map((e) => ({
		source: e.source,
		target: e.target,
		type: e.type,
		strength: e.strength
	}));
	return {
		sim: Le(c).force("link", Fe(u).id((e) => e.id).distance(o.linkDistance).strength((e) => e.strength * o.linkStiffness)).force("charge", Ie().strength(o.charge)).force("center", Ne(r / 2, i / 2)).force("collide", Pe().radius((e) => a(e) + o.collidePadding).iterations(2)).force("x", Re().x((e) => s.get(e.department)?.x ?? r / 2).strength(o.xStrength)).force("y", ze().y((e) => s.get(e.department)?.y ?? i / 2).strength(o.yStrength)).alpha(1).alphaDecay(.02),
		simNodes: c,
		simLinks: u,
		params: o
	};
}
function Qr(e, t, n) {
	let r = e.length, i = Math.max(1, t), a = Math.max(1, n), o = qr(Math.round(Math.sqrt(i / a * r)), 1, Math.max(1, r)), s = Math.max(1, Math.ceil(r / o)), c = /* @__PURE__ */ new Map();
	return e.forEach((e, t) => {
		let n = Math.floor(t / o), l = n === s - 1 ? r - n * o : o, u = t % o;
		c.set(e, {
			x: (u + .5 + (o - l) / 2) * (i / o),
			y: (n + .5) * (a / s)
		});
	}), c;
}
function $r(e, t) {
	let n = [];
	for (let r of e) {
		let e = t.get(r.source), i = t.get(r.target);
		e && i && n.push({
			source: e,
			target: i,
			type: r.type,
			strength: r.strength
		});
	}
	return n;
}
function ei(e, t) {
	return Math.PI * (3 * (e + t) - Math.sqrt((3 * e + t) * (e + 3 * t)));
}
function ti(e, t, n, r) {
	let i = (n) => {
		let r = n * 2 * Math.PI / 720 - Math.PI / 2;
		return {
			x: Math.cos(r) * e,
			y: Math.sin(r) * t
		};
	}, a = [0];
	for (let e = 1; e <= 720; e++) {
		let t = i(e - 1), n = i(e);
		a.push(a[e - 1] + Math.hypot(n.x - t.x, n.y - t.y));
	}
	let o = a[720], s = [], c = 0;
	for (let e = 0; e < n; e++) {
		let t = (e + r) / n % 1 * o;
		for (; c < 720 && a[c + 1] < t;) c++;
		s.push(i(c));
	}
	return s;
}
function ni(e, t, n, r = {}) {
	let i = Math.max(0, e - 1), a = r.maxRadius ?? 30, o = Math.max(1, t / 2 - Math.max(a, 40)), s = Math.max(1, n / 2 - (a + 18)), c = qr(o / s, .25, 6), l = Math.max(76, 2 * a + 18), u = Math.max(2 * a + 18 + 4, 76 / c), d = (e, t) => {
		let n = [];
		for (let r = 1; r <= e; r++) n.push(Math.max(1, Math.floor(ei(r * t * c, r * t) / l)));
		return n;
	}, f = (e) => e.reduce((e, t) => e + t, 0), p = (e) => {
		let t = f(e), n = e.map((e) => Math.min(e, Math.floor(i * e / t))), r = i - f(n);
		for (let t = e.length - 1; r > 0; t = (t - 1 + e.length) % e.length) n[t] < e[t] && (n[t]++, r--);
		return n;
	};
	if (i === 0) return {
		rings: 0,
		stepX: 0,
		stepY: 0,
		counts: [],
		fits: !0
	};
	let m = Math.max(u, 130);
	for (let e = 1; s / e >= u; e++) {
		let t = Math.min(m, s / e), n = d(e, t);
		if (f(n) >= i) return {
			rings: e,
			stepX: t * c,
			stepY: t,
			counts: p(n),
			fits: !0
		};
	}
	let h = null;
	for (let e = 1; e <= 12; e++) {
		let t = u, n = d(e, t);
		for (; f(n) < i;) t *= 1.03, n = d(e, t);
		(!h || e * t < h.rings * h.stepY) && (h = {
			rings: e,
			stepX: t * c,
			stepY: t,
			counts: p(n),
			fits: !1
		});
	}
	return h;
}
function ri(e, t, n, r) {
	if (e.length === 0) return [];
	let i = [...e].sort((e, t) => t.influenceScore - e.influenceScore), a = t / 2, o = n / 2, s = Math.max(...e.map(r)), { stepX: c, stepY: l, counts: u } = ni(e.length, t, n, { maxRadius: s }), d = [{
		...i[0],
		x: a,
		y: o
	}], f = 1;
	return u.forEach((e, t) => {
		let n = t + 1;
		ti(n * c, n * l, e, n % 2 ? 0 : .5).forEach((e) => {
			d.push({
				...i[f++],
				x: a + e.x,
				y: o + e.y
			});
		});
	}), d;
}
function ii({ people: e, relationships: t, departments: n, width: r, height: i, layout: a = "force", nodeRadiusOf: o }) {
	let [s, c] = J([]), [l, u] = J([]), [d, f] = J(!1), [p, m] = J(!1), h = q(null), g = q(o);
	return g.current = o, G(() => {
		if (!e.length || !r || !i) return;
		if (h.current?.stop(), h.current = null, a === "radial") {
			let n = ri(e, r, i, g.current ?? Xr), a = new Map(n.map((e) => [e.id, e]));
			c(n), u($r(t, a)), f(!0), m(!0);
			return;
		}
		f(!1), m(!1);
		let { sim: o, simNodes: s, simLinks: l } = Zr({
			people: e,
			relationships: t,
			departments: n,
			width: r,
			height: i,
			nodeRadiusOf: g.current
		});
		return o.on("tick", () => {
			o.alpha() < .05 && m(!0), c([...s]), u(l.map((e) => ({
				source: e.source,
				target: e.target,
				type: e.type,
				strength: e.strength
			})));
		}), o.on("end", () => {
			m(!0), f(!0);
		}), h.current = o, () => {
			o.stop();
		};
	}, [
		e,
		t,
		n,
		r,
		i,
		a
	]), {
		nodes: s,
		links: l,
		isDone: d,
		isSettled: p
	};
}
//#endregion
//#region src/components/graph/org/fitTransform.ts
var ai = .9, oi = .3, si = {
	width: 172,
	height: 48
};
function ci(e, t, n) {
	if (e.right >= n.width || e.bottom >= n.height) return e;
	let r = Math.max(1, t.width - e.left - e.right), i = Math.max(1, t.height - e.top - e.bottom);
	return (n.height - e.bottom) / i <= (n.width - e.right) / r ? {
		...e,
		bottom: n.height
	} : {
		...e,
		right: n.width
	};
}
function li(e, t, n, r, i = 0, a = {}) {
	let o = Math.max(0, a.left ?? 0), s = Math.max(0, a.right ?? 0), c = Math.max(0, a.top ?? 0), l = Math.max(0, a.bottom ?? 0), u = Math.max(0, e.maxX - e.minX), d = Math.max(0, e.maxY - e.minY), f = Math.max(1, t.width - o - s - 2 * n), p = Math.max(1, t.height - c - l - 2 * n), m = [u > 0 ? f / u : Infinity, d > 0 ? p / d : Infinity], h = Math.max(i, Math.min(r, ...m)), g = (e.minX + e.maxX) / 2, _ = (e.minY + e.maxY) / 2;
	return {
		x: u * h > f + .5 ? o + n - e.minX * h : o + (t.width - o - s) / 2 - g * h,
		y: d * h > p + .5 ? c + n - e.minY * h : c + (t.height - c - l) / 2 - _ * h,
		scale: h
	};
}
function ui(e) {
	return Math.ceil(e.length * 6 + 10);
}
function di(e, t, n) {
	return e.map((e) => {
		let r = t(e.id), i = n?.has(e.id) ?? !1, a = i ? e.name : e.name.split(" ")[0] ?? "", o = Math.max(r, ui(a) / 2);
		return {
			id: e.id,
			minX: e.x - o,
			maxX: e.x + o,
			minY: e.y - r - (i ? 18 : 0),
			maxY: e.y + r + 18
		};
	});
}
function fi(e) {
	if (e.length === 0) return null;
	let t = Infinity, n = Infinity, r = -Infinity, i = -Infinity;
	for (let a of e) t = Math.min(t, a.minX), r = Math.max(r, a.maxX), n = Math.min(n, a.minY), i = Math.max(i, a.maxY);
	return {
		minX: t,
		minY: n,
		maxX: r,
		maxY: i
	};
}
function pi(e, t, n) {
	let { width: r, height: i } = e, a = [];
	return (t.left ?? 0) > 0 && a.push({
		left: 0,
		top: 0,
		right: t.left,
		bottom: i
	}), (t.right ?? 0) > 0 && a.push({
		left: r - t.right,
		top: 0,
		right: r,
		bottom: i
	}), (t.top ?? 0) > 0 && a.push({
		left: 0,
		top: 0,
		right: r,
		bottom: t.top
	}), (t.bottom ?? 0) > 0 && a.push({
		left: 0,
		top: i - t.bottom,
		right: r,
		bottom: i
	}), n && a.push({
		left: r - n.width,
		top: i - n.height,
		right: r,
		bottom: i
	}), a;
}
function mi(e, t) {
	return {
		left: e.minX * t.scale + t.x,
		right: e.maxX * t.scale + t.x,
		top: e.minY * t.scale + t.y,
		bottom: e.maxY * t.scale + t.y
	};
}
function hi(e, t) {
	return e.left < t.right && e.right > t.left && e.top < t.bottom && e.bottom > t.top;
}
function gi(e, t, n, r) {
	let i = {
		left: 0,
		top: 0,
		right: r.width,
		bottom: r.height
	};
	return e.filter((e) => {
		let r = mi(e, t);
		return hi(r, i) && n.some((e) => hi(r, e));
	});
}
function _i(e, t, n, r, i) {
	if (n.length === 0 || t.length === 0) return e;
	let a = i.keep ?? [], o = (e) => a.every((t) => {
		let n = mi(t, e);
		return n.left >= 0 && n.top >= 0 && n.right <= r.width && n.bottom <= r.height;
	}), s = (e) => gi(t, e, n, r).length, c = s(e);
	if (c === 0 && o(e) || !i.axes.x && !i.axes.y) return e;
	o(e) || (c = Infinity);
	let l = Math.max(1, i.step ?? 4), u = 0, d = 0;
	for (let n of t) u = Math.max(u, (n.maxX - n.minX) * e.scale), d = Math.max(d, (n.maxY - n.minY) * e.scale);
	let f = 0, p = 0;
	for (let e of n) {
		let t = e.right - e.left, n = e.bottom - e.top;
		t < r.width && (f = Math.max(f, t)), n < r.height && (p = Math.max(p, n));
	}
	let m = i.axes.x ? f + u : 0, h = i.axes.y ? p + d : 0, g = (e) => {
		let t = [0];
		for (let n = l; n <= e; n += l) t.push(-n, n);
		return t;
	}, _ = [];
	for (let e of g(m)) for (let t of g(h)) (e || t) && _.push([e, t]);
	_.sort((e, t) => Math.hypot(e[0], e[1]) - Math.hypot(t[0], t[1]));
	let v = e;
	for (let [t, n] of _) {
		let r = {
			x: e.x + t,
			y: e.y + n,
			scale: e.scale
		};
		if (!o(r)) continue;
		let i = s(r);
		if (i === 0) return r;
		i < c && (c = i, v = r);
	}
	return v;
}
function vi(e) {
	let t = e.padding ?? 32, n = e.maxZoom ?? 1.25, r = Math.max(oi, e.floor ?? .9), i = di(e.nodes, e.radiusOf, e.focus), a = fi(i);
	if (!a) return null;
	let o = e.mode === "all" || e.layout === "radial" && e.focus.size === 0, s = li(a, e.size, t, n, o ? oi : r, e.inset), c = Math.max(0, e.inset.left ?? 0), l = Math.max(0, e.inset.right ?? 0), u = Math.max(0, e.inset.top ?? 0), d = Math.max(0, e.inset.bottom ?? 0), f = Math.max(1, e.size.width - c - l - 2 * t), p = Math.max(1, e.size.height - u - d - 2 * t), m = (a.maxX - a.minX) * s.scale > f + .5, h = (a.maxY - a.minY) * s.scale > p + .5;
	if (!m && !h) return s;
	let g = i.filter((t) => e.focus.has(t.id)), _ = fi(g);
	if (!o && _) {
		let n = s.scale;
		if (m) {
			let r = c + t - a.minX * n, i = e.size.width - l - t - a.maxX * n, o = c + (e.size.width - c - l) / 2 - (_.minX + _.maxX) / 2 * n;
			s = {
				...s,
				x: Math.min(r, Math.max(i, o))
			};
		}
		if (h) {
			let r = u + t - a.minY * n, i = e.size.height - d - t - a.maxY * n, o = u + (e.size.height - u - d) / 2 - (_.minY + _.maxY) / 2 * n;
			s = {
				...s,
				y: Math.min(r, Math.max(i, o))
			};
		}
	}
	return _i(s, i, e.overlays, e.size, {
		axes: {
			x: m,
			y: h
		},
		keep: g
	});
}
//#endregion
//#region src/components/graph/recordGraphLayout.ts
var yi = 140, bi = 104, xi = .8, Si = 1, Ci = .7, wi = .02, Ti = .6, Ei = .4, Di = 24, Oi = 56;
function ki(e, t) {
	return {
		width: Math.max(1, e - 48) / Ci * .98,
		height: Math.max(1, t - Di - Oi) / Ci * .98
	};
}
var Ai = {
	width: 1160,
	height: 420
}, ji = {
	person: 0,
	initiative: 1,
	work: 2,
	decision: 2,
	knowledge: 2,
	recording: 2,
	asset: 2
}, Mi = (e, t, n) => Math.min(n, Math.max(t, e));
function Ni(e, t) {
	return Math.max(1, e) / Math.max(1, t) * (104 / 140);
}
function Pi(e, t = Ai.width, n = Ai.height) {
	let r = Math.max(1, e), i = Math.max(1, t) / xi, a = Math.max(1, n) / xi, o = Math.sqrt(i * a / r), s = Ni(t, n), c = Mi((r * 172 * 128 / (i * a) - .35) / .35, 0, 1), l = .2 + .1 * c, u = s ** +(1 + c);
	return {
		linkDistance: Mi(o * .75, 130, 240),
		charge: -Mi(o * o / 60, 300, 1200),
		collide: 90,
		xStrength: Mi(l / u, .005, 1),
		yStrength: Mi(l * u, .005, 1)
	};
}
function Fi(e, t, n) {
	let r = new Set(e), i = new Set((n ?? []).filter((e) => r.has(e)));
	if (!i.size) return [];
	let a = new Set(i);
	return t.forEach((e) => {
		!r.has(e.source) || !r.has(e.target) || (i.has(e.source) && a.add(e.target), i.has(e.target) && a.add(e.source));
	}), e.filter((e) => a.has(e));
}
var Ii = [
	{
		value: "person",
		label: "People"
	},
	{
		value: "initiative",
		label: "Initiatives"
	},
	{
		value: "work",
		label: "Work"
	},
	{
		value: "decision",
		label: "Decisions"
	},
	{
		value: "knowledge",
		label: "Knowledge"
	},
	{
		value: "recording",
		label: "Recordings"
	},
	{
		value: "asset",
		label: "Agent library"
	}
];
function Li(e) {
	return `${e.type}:${e.id}`;
}
function Ri(e, t, n) {
	let r = [...new Map(e.filter((e) => n === "all" || e.type === n).map((e) => [Li(e), e])).values()], i = new Set(r.map(Li));
	return {
		records: r,
		edges: [...new Map(t.filter((e) => i.has(e.source) && i.has(e.target)).map((e) => [e.id, e])).values()]
	};
}
var zi = 124;
function Bi(e, t) {
	let n = new Map(e.map((e) => [e, []]));
	t.forEach((e) => {
		e.source !== e.target && n.get(e.source).push(e.target);
	});
	let r = /* @__PURE__ */ new Map(), i = new Map(e.map((e) => [e, []])), a = [], o = (e) => {
		if (r.has(e)) return;
		let t = [{
			id: e,
			next: 0
		}];
		for (r.set(e, 1); t.length;) {
			let e = t[t.length - 1], o = n.get(e.id);
			if (e.next < o.length) {
				let n = o[e.next++], a = r.get(n);
				if (a === 1) continue;
				i.get(e.id).push(n), a || (r.set(n, 1), t.push({
					id: n,
					next: 0
				}));
			} else r.set(e.id, 2), a.push(e.id), t.pop();
		}
	}, s = new Set(t.map((e) => e.target));
	e.filter((e) => !s.has(e)).forEach(o), e.forEach(o);
	let c = new Map(e.map((e) => [e, 0]));
	for (let e = a.length - 1; e >= 0; e--) {
		let t = a[e];
		i.get(t).forEach((e) => c.set(e, Math.max(c.get(e), c.get(t) + 1)));
	}
	return c;
}
function Vi(e, t, n, r, i) {
	let a = Bi(t, n);
	if (Math.max(...a.values()) === 0) {
		let n = new Map(e.map((e) => [Li(e), e.type])), r = [...new Set(t.map((e) => ji[n.get(e)]))].sort((e, t) => e - t);
		a = new Map(t.map((e) => [e, r.indexOf(ji[n.get(e)])]));
	}
	let o = ki(r, i), s = Mi(Math.floor((o.height - 104) / 116) + 1, 3, 12), c = Mi((o.height - 104) / Math.max(1, s - 1), 116, zi), l = /* @__PURE__ */ new Map();
	t.forEach((e) => {
		let t = a.get(e);
		l.set(t, [...l.get(t) ?? [], e]);
	});
	let u = /* @__PURE__ */ new Map(), d = /* @__PURE__ */ new Map();
	n.forEach((e) => d.set(e.target, [...d.get(e.target) ?? [], e.source]));
	let f = [...l.keys()].sort((e, t) => e - t), p = (e) => Math.ceil(l.get(e).length / s), m = f.reduce((e, t) => e + p(t), 0), h = m - f.length, g = f.length - 1, _ = h * 36 + g * 132, v = m * 140 + _ > Math.max(1, r - 48) ? o.width : Math.max(1, r - 48), y = _ > 0 ? Mi((v - m * 140) / _, 0, 2) : 1, b = Math.max(16, 36 * y), x = Math.max(48, 132 * y), S = /* @__PURE__ */ new Map(), C = 0;
	f.forEach((e) => {
		let t = l.get(e), n = (e) => {
			let t = (d.get(e) ?? []).filter((e) => u.has(e));
			return t.length ? t.reduce((e, t) => e + u.get(t), 0) / t.length : Infinity;
		}, r = e === 0 ? t : [...t].sort((e, t) => n(e) - n(t));
		r.forEach((e, t) => u.set(e, t));
		let i = p(e), a = Math.ceil(r.length / i);
		r.forEach((e, t) => {
			let n = Math.floor(t / a), i = t % a, o = Math.min(a, r.length - n * a);
			S.set(e, {
				x: C + n * (140 + b),
				y: (i - (o - 1) / 2) * c
			});
		}), C += i * 140 + (i - 1) * b + x;
	});
	let w = C - x;
	return S.forEach((e) => {
		e.x -= w / 2;
	}), S;
}
function Hi(e, t) {
	return Math.PI * (3 * (e + t) - Math.sqrt((3 * e + t) * (e + 3 * t)));
}
function Ui(e, t, n, r) {
	let i = (n) => {
		let r = n * 2 * Math.PI / 720 - Math.PI / 2;
		return {
			x: Math.cos(r) * e,
			y: Math.sin(r) * t
		};
	}, a = [0];
	for (let e = 1; e <= 720; e++) {
		let t = i(e - 1), n = i(e);
		a.push(a[e - 1] + Math.hypot(n.x - t.x, n.y - t.y));
	}
	let o = a[720], s = [], c = 0;
	for (let e = 0; e < n; e++) {
		let t = (e + r) / n * o;
		for (; c < 720 && a[c + 1] < t;) c++;
		s.push(i(c));
	}
	return s;
}
var Wi = 170;
function Gi(e, t, n, r = Ji) {
	let i = Math.max(0, e - 1);
	if (!i) return [{
		rings: 0,
		stepX: 0,
		stepY: 0,
		counts: [],
		fits: !0
	}];
	let a = ki(t, n), o = Math.max(70, (a.width - 140) / 2), s = Math.max(52, (a.height - 104) / 2), c = Mi(t / n, 1, 2.4), l = Math.max(Wi, 128 * c), u = (e, t, n) => Array.from({ length: e }, (e, r) => Math.max(1, Math.floor(Hi((r + 1) * t, (r + 1) * n) / Wi))), d = (e) => e.reduce((e, t) => e + t, 0), f = (e) => {
		let t = d(e), n = e.map((e) => Math.min(e, Math.floor(i * e / t))), r = i - d(n);
		for (let t = e.length - 1; r > 0; t = (t - 1 + e.length) % e.length) n[t] < e[t] && (n[t]++, r--);
		return n;
	}, p = [];
	for (let e of [!1, !0]) for (let t = 1; t <= 6 && o / t >= Wi / 2; t++) {
		let n = Math.min(128, s / t), r = e ? o / t : Math.min(l, o / t), a = u(t, r, n);
		d(a) >= i && p.push({
			rings: t,
			stepX: r,
			stepY: n,
			counts: f(a),
			fits: !0
		});
	}
	p.push(...Zi(i, t, n, r, u, f));
	let m = 1;
	for (; d(u(m, l, 128)) < i;) m++;
	return p.push({
		rings: m,
		stepX: l,
		stepY: 128,
		counts: f(u(m, l, 128)),
		fits: !1
	}), p;
}
var Ki = 150, qi = 110, Ji = [
	"People",
	"Initiatives",
	"Work",
	"Decisions",
	"Knowledge"
], Yi = .01, Xi = 12;
function Zi(e, t, n, r, i, a) {
	let o = da({
		width: t,
		height: n
	}, {
		legend: r.length ? ua(r, t) : null,
		controls: ia
	}), s = (e) => e > 0 ? Math.max(Di, e + aa) : Di, c = Math.max(1, t - s(o.left) - s(o.right)), l = Math.max(1, n - s(o.top) - s(o.bottom)), u = (e) => e.reduce((e, t) => e + t, 0), d = [];
	for (let t = Ci; t >= .099999999; t -= Yi) {
		let n = (c / t - 140) / 2, r = (l / t - 104) / 2;
		if (!(n <= 0 || r <= 0) && !((2 * n / Ki + 1) * (2 * r / qi + 1) < e + 1)) for (let t = 1; t <= Xi && n / t >= Wi / 2; t++) {
			let o = n / t, s = r / t, c = i(t, o, s);
			if (!(u(c) < e)) {
				d.push({
					rings: t,
					stepX: o,
					stepY: s,
					counts: a(c),
					fits: !1,
					shaped: !0
				});
				break;
			}
		}
	}
	return d;
}
function Qi(e, t, n, r) {
	let i = $i(Gi(e.length, t, n, r));
	return i ? new Map(e.map((e, t) => [e, i.points[t]])) : /* @__PURE__ */ new Map();
}
function $i(e) {
	for (let t = 0; t < e.length; t++) {
		if (!e[t].shaped) {
			let n = ea(e[t]);
			if (n) return {
				plan: e[t],
				points: n
			};
			continue;
		}
		let n = t;
		for (; n < e.length && e[n].shaped;) n++;
		let r = ea(e[n - 1]);
		if (r) {
			let i = t, a = n - 1, o = {
				plan: e[a],
				points: r
			};
			for (; i < a;) {
				let t = Math.floor((i + a) / 2), n = ea(e[t]);
				n ? (o = {
					plan: e[t],
					points: n
				}, a = t) : i = t + 1;
			}
			return o;
		}
		t = n - 1;
	}
	return null;
}
function ea(e) {
	let t = [{
		x: 0,
		y: 0
	}];
	if (e.counts.forEach((n, r) => {
		let i = r + 1;
		t.push(...Ui(i * e.stepX, i * e.stepY, n, i % 2 ? .25 : .75));
	}), (e.fits || e.shaped) && e.rings > 0) {
		let n = e.rings * e.stepX, r = e.rings * e.stepY, i = Ki, a = qi, o = [t[0]], s = (e, t) => o.every((n) => Math.abs(n.x - e) >= i || Math.abs(n.y - t) >= a), c = Math.max(4, Math.sqrt(4 * n * r / 2e4));
		for (let e = 1; e < t.length; e++) {
			let l = t[e], u = s(l.x, l.y) ? l : null, d = 0;
			if (!u) for (let e = -r; e <= r + .01; e += c) for (let t = -n; t <= n + .01; t += c) {
				let n = ((t - l.x) / i) ** 2 + ((e - l.y) / a) ** 2;
				u && n >= d || s(t, e) && (u = {
					x: t,
					y: e
				}, d = n);
			}
			if (!u) return null;
			t[e] = u, o.push(u);
		}
	}
	return t;
}
function ta(e, t, n, r = {}) {
	let i = r.width && r.width > 0 ? r.width : Ai.width, a = r.height && r.height > 0 ? r.height : Ai.height, o = e.map(Li);
	if (!o.length) return /* @__PURE__ */ new Map();
	let s = new Map(o.map((e) => [e, 0])), c = t.filter((e) => s.has(e.source) && s.has(e.target));
	c.forEach((e) => {
		s.set(e.source, s.get(e.source) + 1), s.set(e.target, s.get(e.target) + 1);
	});
	let l = [...o].sort((e, t) => s.get(t) - s.get(e) || e.localeCompare(t)), u = /* @__PURE__ */ new Map();
	if (n === "radial") return Qi(l, i, a, Ii.filter((t) => e.some((e) => e.type === t.value)).map((e) => e.label));
	if (n === "hierarchy") return Vi(e, l, c, i, a);
	let d = Pi(o.length, i, a), f = d.linkDistance, p = Ni(i, a), m = l.map((e, t) => {
		let n = f * Math.sqrt((t + .5) / l.length) * 1.5;
		return {
			id: e,
			x: Math.cos(t * 2.4) * n * p,
			y: Math.sin(t * 2.4) * n / p
		};
	}), h = Le(m).force("link", Fe(c.map((e) => ({
		source: e.source,
		target: e.target
	}))).id((e) => e.id).distance(d.linkDistance).strength(.1)).force("charge", Ie().strength(d.charge)).force("collide", Pe(d.collide).iterations(3)).force("x", Re(0).strength(d.xStrength)).force("y", ze(0).strength(d.yStrength)).force("center", Ne(0, 0)).stop();
	h.tick(300), h.force("link", null).force("charge", null).force("x", null).force("y", null).force("center", null), h.tick(80);
	let g = m.map((e) => e.y * .7428571428571429), _ = Math.max(...g) - Math.min(...g) + 104, v = (ki(i, a).height - 104) / (_ - 104), y = 1;
	if (v < 1 && v >= .85) {
		let e = (e) => {
			let t = 0;
			for (let n = 0; n < m.length; n++) for (let r = n + 1; r < m.length; r++) Math.abs(m[n].x - m[r].x) < 140 && Math.abs(g[n] - g[r]) * e < 104 && t++;
			return t;
		};
		e(v) <= e(1) && (y = v);
	}
	return m.forEach((e, t) => u.set(e.id, {
		x: e.x,
		y: g[t] * y
	})), u;
}
var na = .25, ra = .1, ia = {
	width: 212,
	height: 48
}, aa = 8, oa = 16, sa = 260, ca = .4, la = .6;
function ua(e, t) {
	if (!e.length) return {
		width: 0,
		height: 0
	};
	let n = 22 + e.map((e) => 14 + Math.ceil(e.length * 5.6)).reduce((e, t) => e + t, 0) + 12 * (e.length - 1), r = Math.max(120, t - 288), i = Math.max(1, Math.ceil(n / r));
	return {
		width: Math.min(n, r) + 12,
		height: 14 + i * 16 + (i - 1) * 4 + 12
	};
}
function da(e, t) {
	let n = {
		left: 0,
		right: 0,
		top: 0,
		bottom: 0
	}, { legend: r, controls: i } = t;
	if (r && r.width > 0 && i && i.width > 0) {
		let t = e.height - 48, a = r.height + i.height + 16;
		if (t < sa && a > ca * t) return r.width + i.width + 16 <= la * e.width ? {
			...n,
			left: r.width,
			right: i.width
		} : {
			...n,
			bottom: Math.max(r.height, i.height)
		};
	}
	if (t.controls && t.controls.width > 0 && (n = ci(n, e, t.controls)), t.legend && t.legend.width > 0) {
		let r = ci({
			...n,
			left: n.right,
			right: n.left
		}, e, t.legend);
		n = {
			...r,
			left: r.right,
			right: r.left
		};
	}
	return n;
}
function fa(e, t) {
	let n = [], { legend: r, controls: i } = t ?? {};
	return r && r.width > 0 && r.height > 0 && n.push({
		left: 0,
		top: e.height - r.height,
		right: r.width,
		bottom: e.height
	}), i && i.width > 0 && i.height > 0 && n.push({
		left: e.width - i.width,
		top: e.height - i.height,
		right: e.width,
		bottom: e.height
	}), n;
}
var pa = {
	x0: 0,
	y0: 0,
	x1: 140,
	y1: 104
}, ma = {
	x0: 40,
	y0: -2,
	x1: 100,
	y1: 58
};
function ha(e, t, n = pa) {
	let r = null;
	for (let i of t) {
		let t = e.get(i);
		if (!t) continue;
		let a = t.x + n.x0, o = t.y + n.y0, s = t.x + n.x1, c = t.y + n.y1;
		r = r ? {
			x0: Math.min(r.x0, a),
			y0: Math.min(r.y0, o),
			x1: Math.max(r.x1, s),
			y1: Math.max(r.y1, c)
		} : {
			x0: a,
			y0: o,
			x1: s,
			y1: c
		};
	}
	return r;
}
function ga(e, t, n) {
	let { minZoom: r = xi, maxZoom: i = 1, inset: a = {}, readableZoom: o = Ci, neighbourhoodZoom: s = Ti, focusMinZoom: c = Ei } = n, l = Math.max(oa, n.padding ?? 24), u = ha(e, e.keys());
	if (!u || t.width <= 0 || t.height <= 0) return null;
	let d = (e) => e && e > 0 ? Math.max(l, e + aa) : l, f = {
		x0: d(a.left),
		x1: t.width - d(a.right),
		y0: d(a.top),
		y1: t.height - d(a.bottom)
	}, p = Math.max(1, f.x1 - f.x0), m = Math.max(1, f.y1 - f.y0), h = (e) => Math.min(p / (e.x1 - e.x0), m / (e.y1 - e.y0)), g = (e) => ({
		x: (f.x0 + f.x1) / 2 - (u.x0 + u.x1) / 2 * e,
		y: (f.y0 + f.y1) / 2 - (u.y0 + u.y1) / 2 * e,
		zoom: e
	}), _ = o - wi;
	if (n.mode === "auto" && h(u) >= _ - 1e-9) return g(Math.min(h(u), i));
	if (n.mode === "auto" && !ha(e, n.focusKeys ?? [])) {
		let i = Math.min(r, n.fitAllMinZoom ?? .25);
		return ga(e, t, {
			...n,
			mode: "all",
			minZoom: i
		});
	}
	if (n.mode === "all" && h(u) < r && r <= .25 && t.height - 2 * l < 300 && !ha(e, n.focusKeys ?? [])) return g(Math.max(ra, Math.min(h(u), i)));
	if (n.mode === "all" && h(u) >= r) return g(Math.min(h(u), i));
	let v = ha(e, n.focusKeys ?? []), y = v ? ha(e, n.focusKeys ?? [], ma) : null, b = v && y ? {
		x0: Math.min(v.x0, y.x0),
		y0: Math.min(v.y0, y.y0),
		x1: Math.max(v.x1, y.x1),
		y1: Math.max(v.y1, y.y1)
	} : null, x = v ? ha(e, n.fitKeys?.length ? n.fitKeys : n.focusKeys ?? []) : null, S = (e, n) => {
		let r = (t, r, i, a, o) => {
			for (let o of n) if ((o[r] - o[t]) * e <= a - i + .5) return (i + a) / 2 - (o[t] + o[r]) / 2 * e;
			if (v && y && b) {
				let n = (i + a) / 2 - (v[t] + v[r]) / 2 * e, s = [oa, o - oa], c = [
					[
						b,
						i,
						a
					],
					[b, ...s],
					[
						y,
						i,
						a
					],
					[y, ...s]
				];
				for (let [i, a, o] of c) {
					let s = a - i[t] * e, c = o - i[r] * e;
					if (s <= c + .5) return Mi(n, s, Math.max(s, c));
				}
				return oa - y[t] * e;
			}
			return i - n[n.length - 1][t] * e;
		};
		return {
			x: r("x0", "x1", f.x0, f.x1, t.width),
			y: r("y0", "y1", f.y0, f.y1, t.height),
			zoom: e
		};
	};
	if (n.mode !== "all" && v && b && x) {
		let e = h(x), t = n.mode === "auto" ? Math.min(s, r) : r, a = n.mode === "auto" && e < _ && h(u) >= e - 1e-9, o = Math.min(p / (b.x1 - b.x0), m / (b.y1 - b.y0)), l = Math.min(r, Math.max(c, o)), d = n.mode === "auto" && e < _ ? w() : null, f = n.mode === "auto" && e < _ && (l >= _ - 1e-9 || d !== null);
		return e >= t && !a && !f ? T(S(Math.min(e, i), [x])) : d || T(S(l, [
			u,
			x,
			v
		]));
	}
	let C = S(Mi(h(u), r, i), v ? [u, v] : [u]);
	return v ? T(C) : C;
	function w() {
		if (!b || !v) return null;
		let a = fa(t, n.overlays), o = oa, s = Math.max(1, t.width - 32 - 1), c = Math.max(1, t.height - 32 - 1), l = Math.min(r, i, s / (b.x1 - b.x0), c / (b.y1 - b.y0));
		if (l < _ - 1e-9) return null;
		let u = (n.focusKeys ?? []).flatMap((t) => {
			let n = ha(e, [t]), r = ha(e, [t], ma);
			return n ? [{
				x0: Math.min(n.x0, r?.x0 ?? n.x0),
				y0: Math.min(n.y0, r?.y0 ?? n.y0),
				x1: Math.max(n.x1, r?.x1 ?? n.x1),
				y1: Math.max(n.y1, r?.y1 ?? n.y1)
			}] : [];
		});
		if (u.length === 0) return null;
		let d = (e, n, r) => u.every((i) => {
			let s = {
				left: i.x0 * e + n,
				top: i.y0 * e + r,
				right: i.x1 * e + n,
				bottom: i.y1 * e + r
			};
			return s.left < 15.5 || s.top < 15.5 || s.right > t.width - o + .5 || s.bottom > t.height - o + .5 ? !1 : !a.some((e) => s.left < e.right && s.right > e.left && s.top < e.bottom && s.bottom > e.top);
		});
		for (let e = l; e >= _ - 1e-9; e -= .01) {
			let n = o - b.x0 * e, r = t.width - o - b.x1 * e, i = o - b.y0 * e, a = t.height - o - b.y1 * e;
			if (n > r + .5 || i > a + .5) continue;
			let s = Mi((t.width - (b.x0 + b.x1) * e) / 2, n, Math.max(n, r)), c = Mi((t.height - (b.y0 + b.y1) * e) / 2, i, Math.max(i, a)), l = Math.ceil(Math.max(r - n, a - i) / 8);
			for (let t = 0; t <= l; t++) for (let o = -t; o <= t; o++) for (let l = -t; l <= t; l++) {
				if (Math.max(Math.abs(l), Math.abs(o)) !== t) continue;
				let u = Mi(s + l * 8, n, Math.max(n, r)), f = Mi(c + o * 8, i, Math.max(i, a));
				if (d(e, u, f)) return {
					x: u,
					y: f,
					zoom: e
				};
			}
		}
		return null;
	}
	function T(r) {
		if (!b || t.height - 2 * l < 300) return r;
		let i = fa(t, n.overlays);
		if (!i.length) return r;
		let a = [];
		for (let t of e.values()) a.push({
			minX: t.x,
			minY: t.y,
			maxX: t.x + 140,
			maxY: t.y + 104
		});
		let o = [{
			minX: b.x0,
			minY: b.y0,
			maxX: b.x1,
			maxY: b.y1
		}], s = r.zoom, c = {
			x: u.x0 * s + r.x < f.x0 - .5 || u.x1 * s + r.x > f.x1 + .5,
			y: u.y0 * s + r.y < f.y0 - .5 || u.y1 * s + r.y > f.y1 + .5
		}, d = _i({
			x: r.x,
			y: r.y,
			scale: s
		}, a, i, t, {
			axes: c,
			keep: o
		});
		return {
			x: d.x,
			y: d.y,
			zoom: s
		};
	}
}
//#endregion
//#region src/components/graph/RecordGraph.tsx
var _a = "No recorded connections — search, or select related records", va = {
	person: "Person",
	initiative: "Initiative",
	work: "Work",
	decision: "Decision",
	knowledge: "Knowledge",
	recording: "Recording",
	asset: "Agent library"
}, ya = {
	person: {
		bg: "var(--color-primary-bg)",
		fg: "var(--color-primary-fg)",
		swatch: "var(--color-primary)"
	},
	initiative: {
		bg: "var(--color-accent-bg)",
		fg: "var(--color-accent-fg)",
		swatch: "var(--color-accent)"
	},
	work: {
		bg: "var(--color-success-bg)",
		fg: "var(--color-success-fg)",
		swatch: "var(--color-success)"
	},
	decision: {
		bg: "var(--color-warning-bg)",
		fg: "var(--color-warning-fg)",
		swatch: "var(--color-warning)"
	},
	knowledge: {
		bg: "var(--color-info-bg)",
		fg: "var(--color-info-fg)",
		swatch: "var(--color-info)"
	},
	recording: {
		bg: "var(--color-info-bg)",
		fg: "var(--color-info-fg)",
		swatch: "var(--color-info)"
	},
	asset: {
		bg: "var(--color-neutral-bg)",
		fg: "var(--color-neutral-fg)",
		swatch: "var(--color-neutral)"
	}
}, ba = {
	bg: "var(--color-danger-bg)",
	fg: "var(--color-danger-fg)",
	swatch: "var(--color-danger)"
}, xa = /* @__PURE__ */ new Set([
	"blocked",
	"failed",
	"at_risk",
	"error",
	"cancelled",
	"canceled"
]), Sa = /* @__PURE__ */ new Set([
	"open",
	"in_progress",
	"active",
	"published",
	"running",
	"todo"
]);
function Ca(e) {
	return (e ?? "").trim().toLowerCase().replace(/[\s-]+/g, "_");
}
function wa(e) {
	let t = e.replace(/[_-]+/g, " ").trim();
	return t.charAt(0).toUpperCase() + t.slice(1);
}
var Ta = /related (result|match)/i, Ea = 48, Da = 28, Oa = 28, ka = 30, Aa = {
	padding: .12,
	minZoom: xi,
	maxZoom: 1
}, ja = 16, Ma = 40;
function Na({ data: e }) {
	let { record: n, selected: r, onToggle: i } = e, a = xa.has(Ca(n.status)), o = a && n.type !== "person" ? ba : ya[n.type], s = n.type === "person" ? void 0 : a ? /* @__PURE__ */ X(g, { size: 22 }) : n.type === "asset" ? /* @__PURE__ */ X(h, { size: 22 }) : n.type === "recording" ? /* @__PURE__ */ X(f, { size: 22 }) : /* @__PURE__ */ X(u, { size: 22 }), c = n.status ? wa(n.status) : n.subtitle || va[n.type], l = !!n.status && (n.type === "work" || n.type === "decision");
	return /* @__PURE__ */ Z("div", {
		className: "relative flex h-[104px] w-[140px] flex-col items-center",
		"data-record-key": Li(n),
		children: [
			/* @__PURE__ */ X(Q, {
				type: "target",
				position: $.Left,
				isConnectable: !1,
				className: "opacity-0"
			}),
			/* @__PURE__ */ Z("button", {
				type: "button",
				onClick: i,
				"aria-pressed": r,
				"aria-label": `${va[n.type]}: ${n.title}${n.status ? `, ${wa(n.status)}` : ""}`,
				title: n.description ?? n.title,
				className: t("nodrag nopan pointer-events-auto flex h-full w-full cursor-pointer flex-col items-center gap-1 rounded-lg border-none bg-transparent px-2 pb-1 pt-1 text-center", "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"),
				children: [
					/* @__PURE__ */ Z("span", {
						className: "relative inline-flex shrink-0",
						children: [/* @__PURE__ */ X(M, {
							name: n.title,
							src: n.type === "person" ? n.avatarUrl : void 0,
							size: Ea,
							color: o.bg,
							foreground: o.fg,
							icon: s,
							showTitle: !1,
							className: t("border border-current", r && "ring-2 ring-primary ring-offset-2 ring-offset-surface")
						}), r && /* @__PURE__ */ X("span", {
							"aria-hidden": "true",
							"data-testid": "record-graph-check",
							className: "absolute -right-1 -top-1 inline-flex h-[18px] w-[18px] items-center justify-center rounded-full bg-primary text-on-primary ring-2 ring-surface",
							children: /* @__PURE__ */ X(p, { size: 11 })
						})]
					}),
					/* @__PURE__ */ X("span", {
						"data-testid": r ? "record-graph-selected-title" : void 0,
						className: t("rounded-sm bg-surface px-1 text-xs font-medium leading-tight text-text-primary", r ? "relative z-10 w-max max-w-[220px] break-words shadow-sm" : "line-clamp-2"),
						children: n.title
					}),
					l ? /* @__PURE__ */ X(P, {
						size: "xs",
						color: a ? "var(--color-danger)" : Sa.has(Ca(n.status)) ? "var(--color-success)" : "var(--color-text-tertiary)",
						label: c,
						className: "max-w-full truncate rounded-sm bg-surface px-1 text-xs text-text-secondary"
					}) : /* @__PURE__ */ X("span", {
						className: t("max-w-full truncate rounded-sm bg-surface px-1 text-xs", n.status ? "text-primary" : "text-text-secondary"),
						children: c
					})
				]
			}),
			/* @__PURE__ */ X(Q, {
				type: "source",
				position: $.Right,
				isConnectable: !1,
				className: "opacity-0"
			})
		]
	});
}
function Pa({ id: e, data: n }) {
	if (!n) return null;
	let { from: r, to: i, label: a, related: o, labelShown: s } = n, c = i.x - r.x, l = i.y - r.y, u = Math.hypot(c, l);
	if (u < 62) return null;
	let d = c / u, f = l / u, p = r.x + d * Oa, m = r.y + f * Oa, h = i.x - d * ka, g = i.y - f * ka, _ = Math.min(40, u * .08), v = (p + h) / 2 - f * _, y = (m + g) / 2 + d * _, b = h - v, x = g - y, S = Math.hypot(b, x) || 1, C = b / S, w = x / S, T = `M${h} ${g} L${h - C * 8 - w * 4} ${g - w * 8 + C * 4} L${h - C * 8 + w * 4} ${g - w * 8 - C * 4} Z`, E = .25 * p + .5 * v + .25 * h, D = .25 * m + .5 * y + .25 * g, O = "var(--color-text-tertiary)";
	return /* @__PURE__ */ Z("g", {
		"data-edge-id": e,
		"data-related": o ? "true" : "false",
		className: "group",
		children: [
			/* @__PURE__ */ X("path", {
				d: `M${p} ${m} Q${v} ${y} ${h} ${g}`,
				fill: "none",
				stroke: "transparent",
				strokeWidth: 12,
				className: "[pointer-events:stroke]"
			}),
			/* @__PURE__ */ X("path", {
				d: `M${p} ${m} Q${v} ${y} ${h} ${g}`,
				fill: "none",
				stroke: O,
				strokeWidth: 1,
				strokeDasharray: o ? "4 4" : void 0
			}),
			/* @__PURE__ */ X("path", {
				d: T,
				fill: O
			}),
			a && /* @__PURE__ */ X("text", {
				"data-edge-label": s ? "shown" : "hover",
				x: E,
				y: D,
				textAnchor: "middle",
				dominantBaseline: "central",
				fontSize: 11,
				fill: "var(--color-text-secondary)",
				stroke: "var(--color-surface)",
				strokeWidth: 4,
				strokeLinejoin: "round",
				paintOrder: "stroke",
				className: t("pointer-events-none select-none", !s && "opacity-0 transition-opacity group-hover:opacity-100"),
				children: a
			})
		]
	});
}
var Fa = { record: Na }, Ia = { record: Pa };
function La({ exit: e }) {
	return /* @__PURE__ */ X("svg", {
		"aria-hidden": "true",
		width: "14",
		height: "14",
		viewBox: "0 0 14 14",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		strokeLinecap: "round",
		children: e ? /* @__PURE__ */ X("path", { d: "M5 1.5 V5 H1.5 M9 1.5 V5 H12.5 M12.5 9 H9 V12.5 M1.5 9 H5 V12.5" }) : /* @__PURE__ */ X("path", { d: "M1.5 5 V1.5 H5 M9 1.5 H12.5 V5 M12.5 9 V12.5 H9 M5 12.5 H1.5 V9" })
	});
}
function Ra({ graphKey: e, positions: t, focusKeys: n, fitKeys: r, canvasRef: i, apiRef: a, legend: o, fullscreen: s, onFullscreen: c, testId: u }) {
	let d = Ae(), { zoom: f } = Me(), p = o.map((e) => e.label), m = q({
		positions: t,
		focusKeys: n,
		fitKeys: r,
		legendLabels: p
	});
	m.current = {
		positions: t,
		focusKeys: n,
		fitKeys: r,
		legendLabels: p
	};
	let h = W((e, t = !1) => {
		let n = i.current?.getBoundingClientRect();
		if (!n) return null;
		let { positions: r, focusKeys: a, fitKeys: o, legendLabels: s } = m.current, c = {
			width: n.width,
			height: n.height
		}, l = {
			legend: s.length ? ua(s, c.width) : null,
			controls: ia
		}, u = da(c, l);
		return ga(r, c, {
			mode: a.length || e === "auto" ? e : "all",
			focusKeys: a,
			fitKeys: o,
			inset: u,
			overlays: l,
			minZoom: t && e === "all" ? na : Aa.minZoom,
			maxZoom: Aa.maxZoom
		});
	}, [i]), g = W((e, t = !1) => {
		let n = h(e, t);
		if (n) {
			d.setViewport(n, t ? { duration: 200 } : void 0);
			return;
		}
		let r = m.current.fitKeys;
		d.fitView(e !== "all" && r.length ? {
			...Aa,
			nodes: r.map((e) => ({ id: e }))
		} : Aa);
	}, [d, h]), v = W(() => g("auto"), [g]), y = W(() => g("all", !0), [g]);
	return G(() => (a.current = {
		fitToFocus: () => g("focus", !0),
		fitAll: () => g("all", !0)
	}, () => {
		a.current = null;
	}), [a, g]), G(() => {
		if (typeof requestAnimationFrame != "function") return;
		let e = requestAnimationFrame(v);
		return () => cancelAnimationFrame(e);
	}, [e, v]), G(() => {
		let e = i.current;
		if (!e || typeof ResizeObserver > "u" || typeof requestAnimationFrame != "function") return;
		let t = null, n = 0, r = new ResizeObserver((e) => {
			let r = e[0]?.contentRect;
			if (!r || r.width <= 0 || r.height <= 0 || t && Math.abs(t.width - r.width) < 1 && Math.abs(t.height - r.height) < 1) return;
			let i = !t;
			t = {
				width: r.width,
				height: r.height
			}, !i && (cancelAnimationFrame(n), n = requestAnimationFrame(v));
		});
		return r.observe(e), () => {
			r.disconnect(), cancelAnimationFrame(n);
		};
	}, [i, v]), /* @__PURE__ */ Z(Y, { children: [o.length > 0 && /* @__PURE__ */ X("ul", {
		"aria-label": "Record types",
		"data-testid": `${u}-legend`,
		className: "absolute bottom-3 left-3 z-10 m-0 flex max-w-[calc(100%-18rem)] list-none flex-wrap items-center gap-x-3 gap-y-1 rounded-md border border-border bg-surface px-2.5 py-1.5 text-xs text-text-secondary max-md:hidden",
		children: o.map((e) => /* @__PURE__ */ X("li", {
			className: "inline-flex items-center",
			children: /* @__PURE__ */ X(P, {
				color: ya[e.value].swatch,
				size: "sm",
				label: e.label
			})
		}, e.value))
	}), /* @__PURE__ */ Z(_, {
		gap: "xs",
		wrap: !1,
		className: "absolute bottom-3 right-3 z-10",
		children: [/* @__PURE__ */ X(ht, {
			zoom: f,
			minZoom: .15,
			maxZoom: 2,
			onZoomIn: () => void d.zoomIn(),
			onZoomOut: () => void d.zoomOut(),
			onFit: y,
			"data-testid": `${u}-zoom`
		}), /* @__PURE__ */ X(l, {
			size: "md",
			variant: "outline",
			"aria-label": s ? "Exit full screen" : "Full screen connections",
			"aria-pressed": s,
			onClick: c,
			children: /* @__PURE__ */ X(La, { exit: s })
		})]
	})] });
}
function za({ records: e, edges: i, selectedKeys: a, onSelectionChange: o, onAskSelection: s, onOpenRecord: c, layout: l, onLayoutChange: u, typeFilter: d, onTypeFilterChange: f, typeLabels: p, className: m, "data-testid": h = "record-graph", "aria-label": g = "Record connections", emptyLabel: v = _a, showIsolated: b = !1, focusKeys: S, ref: w }) {
	let [E, D] = J("force"), [O, k] = J("all"), [A, j] = J(!1), [ee, M] = J(!1), N = q(null), P = q(null), F = q(null);
	be(w, () => ({
		fitToFocus: () => F.current?.fitToFocus(),
		fitAll: () => F.current?.fitAll()
	}), []);
	let [I, L] = J(null), ne = l ?? E, R = d ?? O, re = K(() => Ii.map((e) => ({
		value: e.value,
		label: p?.[e.value] ?? e.label
	})), [p]), z = K(() => Ri(e, i, R), [
		e,
		i,
		R
	]), ie = K(() => ta(z.records, z.edges, ne, I ?? void 0), [
		z,
		ne,
		I
	]), B = K(() => new Set(a), [a]), ae = e.filter((e) => B.has(Li(e))), oe = W((e) => {
		o(B.has(e) ? a.filter((t) => t !== e) : [...a, e]);
	}, [
		o,
		B,
		a
	]), se = z.records.map((e) => {
		let t = Li(e);
		return {
			id: t,
			type: "record",
			position: ie.get(t),
			initialWidth: 140,
			initialHeight: 104,
			draggable: !1,
			connectable: !1,
			selectable: !1,
			focusable: !1,
			zIndex: +!!B.has(t),
			data: {
				record: e,
				selected: B.has(t),
				onToggle: () => oe(t)
			}
		};
	}), ce = /* @__PURE__ */ new Set([...S ?? [], ...a]), V = !ce.size && z.edges.length <= ja, H = (e) => {
		let t = ie.get(e);
		return {
			x: t.x + 70,
			y: t.y + Da
		};
	}, le = z.edges.filter((e) => e.source !== e.target).map((e) => ({
		id: e.id,
		type: "record",
		source: e.source,
		target: e.target,
		focusable: !1,
		selectable: !1,
		data: {
			from: H(e.source),
			to: H(e.target),
			label: e.label,
			related: Ta.test(e.label),
			labelShown: V || ce.has(e.source) || ce.has(e.target)
		}
	})), ue = `${ne}:${I ? `${I.width}x${I.height}` : ""}:${z.records.map(Li).join("|")}:${z.edges.map((e) => e.id).join("|")}`, U = K(() => Fi(z.records.map(Li), z.edges, S), [z, S]), de = K(() => {
		let e = new Set(U);
		return (S ?? []).filter((t) => e.has(t));
	}, [U, S]), fe = z.records.length > 0 && (le.length > 0 || b);
	G(() => {
		let e = P.current;
		if (!e || typeof ResizeObserver > "u") return;
		let t = new ResizeObserver((e) => {
			let t = e[0]?.contentRect;
			if (!t || t.width <= 0 || t.height <= 0) return;
			let n = {
				width: Math.round(t.width / Ma) * Ma,
				height: Math.round(t.height / Ma) * Ma
			};
			L((e) => e && e.width === n.width && e.height === n.height ? e : n);
		});
		return t.observe(e), () => t.disconnect();
	}, [fe]);
	let pe = re.filter((e) => z.records.some((t) => t.type === e.value));
	G(() => {
		if (typeof document > "u") return;
		let e = () => j(document.fullscreenElement === N.current);
		return document.addEventListener("fullscreenchange", e), () => document.removeEventListener("fullscreenchange", e);
	}, []);
	let me = async () => {
		try {
			M(!1), document.fullscreenElement === N.current ? await document.exitFullscreen() : N.current?.requestFullscreen ? await N.current.requestFullscreen() : M(!0);
		} catch {
			M(!0);
		}
	};
	return /* @__PURE__ */ Z(y, {
		ref: N,
		gap: "none",
		"data-testid": h,
		className: t("min-h-0 flex-1 bg-surface [&:fullscreen]:h-full [&:fullscreen]:p-4", m),
		children: [
			/* @__PURE__ */ Z(_, {
				gap: "sm",
				align: "center",
				className: "shrink-0 border-b border-border px-1 py-2",
				"data-testid": `${h}-toolbar`,
				children: [
					/* @__PURE__ */ X(r, {
						density: "compact",
						children: /* @__PURE__ */ X(te, {
							"aria-label": "Connection layout",
							value: ne,
							options: [
								{
									value: "force",
									label: "Force"
								},
								{
									value: "radial",
									label: "Radial"
								},
								{
									value: "hierarchy",
									label: "Hierarchy"
								}
							],
							onChange: (e) => {
								D(e), u?.(e);
							}
						})
					}),
					/* @__PURE__ */ X(C, {
						"aria-label": "Connection record type",
						size: "sm",
						className: "w-auto min-w-28",
						value: R,
						options: [{
							value: "all",
							label: "All types"
						}, ...re],
						onChange: (e) => {
							let t = e.target.value;
							k(t), f?.(t);
						}
					}),
					/* @__PURE__ */ Z(x, {
						className: "text-xs text-text-secondary",
						"data-testid": `${h}-counts`,
						children: [
							z.records.length,
							" records · ",
							z.edges.length,
							" connections"
						]
					}),
					/* @__PURE__ */ Z(_, {
						gap: "xs",
						align: "center",
						className: "ml-auto",
						children: [
							/* @__PURE__ */ Z(x, {
								className: "text-xs text-primary",
								"aria-label": `${a.length} selected`,
								children: [a.length, " selected"]
							}),
							ae.length === 1 && c && /* @__PURE__ */ X(n, {
								size: "sm",
								variant: "secondary",
								onClick: () => c(ae[0]),
								children: "Open record ↗"
							}),
							/* @__PURE__ */ X(n, {
								size: "sm",
								variant: "secondary",
								disabled: !a.length,
								onClick: () => o([]),
								children: "Clear"
							}),
							s && /* @__PURE__ */ X(n, {
								size: "sm",
								disabled: !ae.length,
								onClick: s,
								children: "Ask about selection →"
							})
						]
					})
				]
			}),
			ee && /* @__PURE__ */ X(x, {
				role: "status",
				className: "px-2 py-1 text-xs text-text-secondary",
				children: "Full screen is unavailable in this browser."
			}),
			z.records.length ? !le.length && !b ? /* @__PURE__ */ X(T, {
				title: v,
				testId: `${h}-unconnected`
			}) : /* @__PURE__ */ X(y, {
				ref: P,
				gap: "none",
				className: "relative min-h-40 flex-1 [--xy-background-color:var(--color-surface)]",
				children: /* @__PURE__ */ X(De, { children: /* @__PURE__ */ Z(Ee, {
					nodes: se,
					edges: le,
					nodeTypes: Fa,
					edgeTypes: Ia,
					minZoom: .15,
					maxZoom: 2,
					nodesDraggable: !1,
					nodesConnectable: !1,
					nodesFocusable: !1,
					edgesFocusable: !1,
					elementsSelectable: !1,
					onlyRenderVisibleElements: !0,
					proOptions: { hideAttribution: !0 },
					"aria-label": g,
					children: [/* @__PURE__ */ X(xe, {
						color: "var(--color-border)",
						gap: 22,
						size: 1
					}), /* @__PURE__ */ X(Ra, {
						graphKey: ue,
						positions: ie,
						focusKeys: de,
						fitKeys: U,
						canvasRef: P,
						apiRef: F,
						legend: pe,
						fullscreen: A,
						onFullscreen: () => void me(),
						testId: h
					})]
				}) })
			}) : /* @__PURE__ */ X(T, {
				title: "No connections to show",
				description: "Choose another record type or search for records.",
				testId: `${h}-empty`
			})
		]
	});
}
//#endregion
//#region src/components/graph/org/graphInsights.ts
var Ba = {
	collaborates: "collaborates",
	mentors: "mentors",
	reports_to: "reports to",
	expert_in_common: "shared expertise"
}, Va = 2, Ha = 2, Ua = {
	personMatches: [],
	skillMatches: []
};
function Wa(e, t) {
	let n = t.trim().toLowerCase();
	if (n.length < Ha) return Ua;
	let r = e.filter((e) => e.name.toLowerCase().includes(n) || e.title.toLowerCase().includes(n) || e.department.toLowerCase().includes(n)).slice(0, 6), i = /* @__PURE__ */ new Map();
	for (let t of e) for (let e of t.skills) {
		if (!e.toLowerCase().includes(n)) continue;
		let r = i.get(e);
		r ? r.push(t.id) : i.set(e, [t.id]);
	}
	return {
		personMatches: r,
		skillMatches: [...i.entries()].map(([e, t]) => ({
			skill: e,
			personIds: t
		})).sort((e, t) => t.personIds.length - e.personIds.length).slice(0, 4)
	};
}
function Ga(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e) {
		let e = t.get(n.department);
		e ? e.push(n.id) : t.set(n.department, [n.id]);
	}
	return t;
}
function Ka(e, t) {
	let n = e.filter((e) => e.department === t), r = /* @__PURE__ */ new Map();
	for (let e of n) for (let t of e.skills) r.set(t, (r.get(t) ?? 0) + 1);
	let i = [...r.entries()].sort((e, t) => t[1] - e[1]).slice(0, 6), a = /* @__PURE__ */ new Map();
	for (let t of e) for (let e of t.skills) {
		let n = a.get(e);
		n ? n.push(t) : a.set(e, [t]);
	}
	return {
		members: n,
		topSkills: i,
		atRisk: [...a.entries()].filter(([, e]) => e.length <= 2 && e.some((e) => e.department === t)).map(([e, n]) => ({
			skill: e,
			holder: n.find((e) => e.department === t),
			holderCount: n.length
		})).sort((e, t) => e.holderCount - t.holderCount).slice(0, 8)
	};
}
function qa(e) {
	return e.split(" ")[0] ?? e;
}
function Ja(e) {
	return e ? e.split(",").map((e) => e.trim()).filter(Boolean) : [];
}
function Ya(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e) for (let e of n.skills) {
		let r = t.get(e);
		r ? r.push(n) : t.set(e, [n]);
	}
	return { atRisk: [...t.entries()].filter(([, e]) => e.length <= 2).flatMap(([e, t]) => t.map((n) => ({
		skill: e,
		holder: n,
		holderCount: t.length
	}))).sort((e, t) => e.holderCount - t.holderCount || e.skill.localeCompare(t.skill)).slice(0, 16) };
}
var Xa = "bus_factor", Za = "/iq/work/findings";
function Qa(e, t, n = Za) {
	return `${n}?${(t ? new URLSearchParams({
		sweep: Xa,
		finding: t
	}) : new URLSearchParams({
		sweep: Xa,
		q: e
	})).toString()}`;
}
function $a(e) {
	let t = e.indexOf(":");
	return t <= 0 || !e.slice(t + 1).trim().toLowerCase().includes("holder") ? null : e.slice(0, t).trim().toLowerCase();
}
function eo(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e) {
		if (n.sweep !== "bus_factor" || n.entityType !== "skill") continue;
		let e = $a(n.title);
		!e || t.has(e) || t.set(e, n);
	}
	return t;
}
function to(e, t) {
	return e.get(t.trim().toLowerCase()) ?? null;
}
var no = 12, ro = 18;
function io(e) {
	return Number.isFinite(e) ? Math.max(0, Math.min(1, e)) : 0;
}
function ao(e, t, n, r) {
	return no + (e ? io(t) : r > 0 ? io(n / r) : 0) * ro;
}
function oo(e) {
	let t = /* @__PURE__ */ new Map(), n = (e) => t.set(e, (t.get(e) ?? 0) + 1);
	for (let t of e) n(t.source), t.target !== t.source && n(t.target);
	return t;
}
function so(e) {
	let t = 0;
	for (let n of e.values()) n > t && (t = n);
	return t;
}
//#endregion
//#region src/components/graph/org/presence.ts
var co = {
	office: {
		fill: o("success"),
		stroke: "var(--color-surface)",
		label: "In office"
	},
	wfh: {
		fill: o("info"),
		stroke: "var(--color-surface)",
		label: "Remote"
	},
	travel: {
		fill: o("warning"),
		stroke: "var(--color-surface)",
		label: "Traveling"
	},
	pto: {
		fill: o("caution"),
		stroke: "var(--color-surface)",
		label: "PTO"
	},
	vacation: {
		fill: o("accent"),
		stroke: "var(--color-surface)",
		label: "Vacation"
	},
	sick: {
		fill: o("danger"),
		stroke: "var(--color-surface)",
		label: "Out sick"
	},
	unknown: {
		fill: "var(--color-border-emphasis)",
		stroke: "var(--color-border)",
		label: "No check-in"
	}
}, lo = [
	"pto",
	"vacation",
	"sick"
];
function uo(e, t) {
	return t ? t === "office" ? e === "office" : t === "remote" ? e === "wfh" || e === "travel" : lo.includes(e) : !0;
}
var fo = {
	collaborates: {
		color: "var(--color-text-tertiary)",
		label: "Collaborates"
	},
	mentors: {
		color: "var(--color-primary)",
		label: "Mentors",
		dash: "6 3"
	},
	reports_to: {
		color: "var(--color-border-emphasis)",
		label: "Reports To"
	},
	expert_in_common: {
		color: o("warning"),
		label: "Shared Expertise"
	}
};
//#endregion
//#region src/components/graph/org/OrgGraphNode.tsx
function po({ node: e, departments: t, isSelected: n, isHighlighted: r, onSelect: i, onHover: a, presenceFilter: o, showInfluence: s, degree: c, maxDegree: l, showLabel: u = !0 }) {
	let d = t.find((t) => t.name === e.department)?.color ?? "var(--color-text-tertiary)", f = ao(s, e.influenceScore, c, l), p = e.name.split(" ")[0] ?? e.name, m = e.presence ?? "unknown", h = co[m], g = r || n ? 1 : .3, _ = uo(m, o) ? g : .15, v = Math.max(2, f * .14), y = Math.PI * .25, b = (f - v * .4) * Math.cos(y), x = (f - v * .4) * Math.sin(y);
	function S(t) {
		(t.key === "Enter" || t.key === " " || t.key === "Spacebar") && (t.preventDefault(), i(e.id));
	}
	return /* @__PURE__ */ Z("g", {
		transform: `translate(${e.x}, ${e.y})`,
		onClick: () => i(e.id),
		onMouseEnter: () => a(e.id),
		onMouseLeave: () => a(null),
		onFocus: () => a(e.id),
		onBlur: () => a(null),
		onKeyDown: S,
		tabIndex: 0,
		role: "button",
		"aria-label": `${e.name} · ${e.title} · ${e.department}`,
		"aria-pressed": n,
		opacity: _,
		"data-person-id": e.id,
		className: "cursor-pointer outline-none [&:focus-visible>circle.org-node-main]:stroke-[3]",
		children: [
			m === "wfh" && /* @__PURE__ */ X("circle", {
				r: f + 3,
				fill: "none",
				stroke: co.wfh.fill,
				strokeWidth: 1.5,
				strokeDasharray: "4 3",
				opacity: .5
			}),
			/* @__PURE__ */ X("circle", {
				className: "org-node-main",
				r: f,
				fill: d,
				fillOpacity: n ? 1 : .125,
				stroke: d,
				strokeWidth: n ? 3 : 2
			}),
			u && /* @__PURE__ */ Z("g", {
				className: "pointer-events-none select-none",
				"data-org-label": "",
				children: [/* @__PURE__ */ X("rect", {
					x: -ui(p) / 2,
					y: f + 4,
					width: ui(p),
					height: 14,
					rx: 7,
					fill: "var(--color-surface)",
					fillOpacity: .85
				}), /* @__PURE__ */ X("text", {
					y: f + 14,
					textAnchor: "middle",
					fontSize: 10,
					fill: "var(--color-text-secondary)",
					children: p
				})]
			}),
			n && /* @__PURE__ */ X("rect", {
				x: -ui(e.name) * .55,
				y: -f - 19,
				width: ui(e.name) * 1.1,
				height: 16,
				rx: 8,
				fill: "var(--color-surface)",
				fillOpacity: .85,
				className: "pointer-events-none"
			}),
			n && /* @__PURE__ */ X("text", {
				y: -f - 6,
				textAnchor: "middle",
				fontSize: 11,
				fontWeight: 600,
				fill: "var(--color-text-primary)",
				className: "pointer-events-none",
				children: e.name
			}),
			m !== "unknown" && /* @__PURE__ */ Z("g", {
				transform: `translate(${b}, ${x})`,
				children: [/* @__PURE__ */ X("circle", {
					r: v,
					fill: h.stroke
				}), /* @__PURE__ */ X("circle", {
					r: v - 1,
					fill: h.fill
				})]
			})
		]
	});
}
//#endregion
//#region src/components/graph/org/OrgGraphEdge.tsx
function mo({ source: e, target: t, type: n, strength: r, isHighlighted: i, targetRadius: a, arrowMarkerId: o }) {
	let s = fo[n], c = s?.color ?? "var(--color-border-emphasis)", l = i ? .8 : .2, u = n === "reports_to" ? 1.5 : 1 + r * 1.5, d = t.x ?? 0, f = t.y ?? 0;
	if (n === "reports_to") {
		let n = (a ?? 12 + (t.influenceScore ?? 0) * 18) + 15 + 2, r = (t.x ?? 0) - (e.x ?? 0), i = (t.y ?? 0) - (e.y ?? 0), o = Math.sqrt(r * r + i * i);
		o > n && (d = (t.x ?? 0) - r / o * n, f = (t.y ?? 0) - i / o * n);
	}
	return /* @__PURE__ */ X("line", {
		x1: e.x,
		y1: e.y,
		x2: d,
		y2: f,
		stroke: c,
		strokeWidth: u,
		strokeDasharray: s?.dash,
		opacity: l,
		markerEnd: n === "reports_to" ? `url(#${o})` : void 0,
		"data-relationship": n,
		className: "pointer-events-none"
	});
}
//#endregion
//#region src/components/graph/org/OrgGraphTooltip.tsx
var ho = 220;
function go({ node: e, departments: t, x: n, y: r, containerWidth: a, showInfluence: o }) {
	let c = t.find((t) => t.name === e.department), l = Math.max(8, Math.min(n + 20, a - ho - 20)), u = Math.max(r - 40, 10);
	return /* @__PURE__ */ Z(i, {
		role: "tooltip",
		className: "pointer-events-none absolute z-[100] w-[220px] px-4 py-3 shadow-md",
		style: {
			left: l,
			top: u
		},
		"data-testid": "org-graph-tooltip",
		children: [
			/* @__PURE__ */ X(_, {
				as: "div",
				gap: "none",
				className: "mb-0.5 text-sm font-semibold text-text-primary",
				children: e.name
			}),
			/* @__PURE__ */ X(_, {
				as: "div",
				gap: "none",
				className: "text-xs text-text-secondary",
				children: e.title
			}),
			/* @__PURE__ */ X(_, {
				as: "div",
				gap: "none",
				className: "mt-1 text-[11px] font-medium text-text-secondary",
				children: /* @__PURE__ */ X(P, {
					color: c?.color,
					size: "xs",
					label: e.department
				})
			}),
			e.skills.length > 0 && /* @__PURE__ */ X(_, {
				gap: "xs",
				wrap: !0,
				className: "mt-2",
				children: e.skills.slice(0, 4).map((e) => /* @__PURE__ */ X(s, {
					tone: "neutral",
					size: "xs",
					children: e
				}, e))
			}),
			o && /* @__PURE__ */ Z(_, {
				gap: "sm",
				justify: "between",
				wrap: !1,
				className: "mt-2 text-[11px]",
				children: [/* @__PURE__ */ X(_, {
					as: "span",
					gap: "none",
					className: "text-text-tertiary",
					children: "Influence"
				}), /* @__PURE__ */ Z(_, {
					as: "span",
					gap: "none",
					className: "font-semibold",
					children: [Math.round(e.influenceScore * 100), "/100"]
				})]
			})
		]
	});
}
//#endregion
//#region src/components/graph/org/OrgGraphLegend.tsx
var _o = [
	"office",
	"wfh",
	"travel",
	"pto",
	"vacation",
	"sick"
], vo = 200;
function yo({ departments: e, filter: r, onFilter: a, presenceFilter: o, pinned: s = !1, className: c, "data-testid": l = "org-graph-legend" }) {
	let [u, d] = J(!1);
	return /* @__PURE__ */ Z(i, {
		onMouseEnter: () => d(!0),
		onMouseLeave: () => d(!1),
		"data-testid": l,
		"aria-label": "Graph legend",
		role: "group",
		className: t("absolute left-3 top-3 z-10 w-44 overflow-hidden border border-border bg-surface px-4 py-3 text-[11px] text-text-secondary shadow-sm", "transition-[max-height] duration-300 ease-out focus-within:max-h-[800px]", s || u ? "max-h-[800px]" : "max-h-40", c),
		children: [
			/* @__PURE__ */ X(_, {
				as: "div",
				gap: "none",
				className: "mb-2 text-xs font-semibold text-text-primary",
				children: "Departments"
			}),
			/* @__PURE__ */ X(y, {
				as: "ul",
				gap: "none",
				className: "m-0 list-none p-0",
				children: e.map((e) => {
					let n = r === e.name;
					return /* @__PURE__ */ X("li", { children: /* @__PURE__ */ Z("button", {
						type: "button",
						"aria-pressed": n,
						onClick: () => a(n ? null : e.name),
						className: t("mb-1 flex cursor-pointer items-center gap-1.5 border-none bg-transparent p-0 text-left text-[11px] text-text-secondary", "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary", r && !n && "opacity-40"),
						children: [/* @__PURE__ */ X(P, {
							color: e.color,
							size: "sm"
						}), /* @__PURE__ */ X("span", { children: e.name })]
					}) }, e.id);
				})
			}),
			/* @__PURE__ */ Z(y, {
				gap: "none",
				className: "mt-2 border-t border-border pt-2",
				children: [/* @__PURE__ */ X(_, {
					as: "div",
					gap: "none",
					className: "mb-1.5 text-xs font-semibold text-text-primary",
					children: "Relationships"
				}), Object.entries(fo).map(([e, t]) => /* @__PURE__ */ Z(_, {
					gap: "xs",
					wrap: !1,
					className: "mb-[3px]",
					"data-legend-relationship": e,
					children: [/* @__PURE__ */ X("svg", {
						width: 20,
						height: 8,
						"aria-hidden": "true",
						children: /* @__PURE__ */ X("line", {
							x1: 0,
							y1: 4,
							x2: 20,
							y2: 4,
							stroke: t.color,
							strokeWidth: 2,
							strokeDasharray: t.dash ? "4 2" : void 0
						})
					}), /* @__PURE__ */ X("span", { children: t.label })]
				}, e))]
			}),
			r && /* @__PURE__ */ X(n, {
				variant: "secondary",
				size: "sm",
				fullWidth: !0,
				className: "mt-2",
				onClick: () => a(null),
				children: "Clear Filter"
			}),
			o && /* @__PURE__ */ Z(y, {
				gap: "none",
				className: "mt-2 border-t border-border pt-2",
				children: [
					/* @__PURE__ */ X(_, {
						as: "div",
						gap: "none",
						className: "mb-[5px] text-xs font-semibold text-text-primary",
						children: "Presence today"
					}),
					_o.map((e) => /* @__PURE__ */ Z(_, {
						gap: "xs",
						wrap: !1,
						className: "mb-[3px]",
						children: [/* @__PURE__ */ X(P, {
							color: co[e].fill,
							size: "xs"
						}), /* @__PURE__ */ X("span", { children: co[e].label })]
					}, e)),
					/* @__PURE__ */ Z(_, {
						gap: "xs",
						wrap: !1,
						className: "mb-0.5",
						children: [/* @__PURE__ */ X("span", {
							"aria-hidden": "true",
							className: "box-border h-2 w-2 shrink-0 rounded-full bg-info outline-2 outline-offset-[3px] outline-dashed outline-info"
						}), /* @__PURE__ */ X("span", {
							className: "text-text-tertiary",
							children: "WFH ring"
						})]
					})
				]
			})
		]
	});
}
//#endregion
//#region src/components/graph/org/focusOrgGraph.ts
function bo(e, t) {
	let n = [...e].sort((e, t) => t.strength - e.strength), r = /* @__PURE__ */ new Map(), i = [];
	for (let e of n) {
		let n = r.get(e.source) ?? 0, a = r.get(e.target) ?? 0;
		n >= t && a >= t || (i.push(e), r.set(e.source, n + 1), r.set(e.target, a + 1));
	}
	return i;
}
function xo(e, t, n, { hops: r = 1, minStrength: i = 0, topK: a } = {}) {
	let o = new Set(e.map((e) => e.id)), s = t.filter((e) => e.strength >= i && o.has(e.source) && o.has(e.target));
	a !== void 0 && (s = bo(s, a));
	let c = [...n ?? []].filter((e) => o.has(e));
	if (c.length === 0) {
		let n = new Set(s);
		return {
			people: [...e],
			relationships: t.filter((e) => n.has(e))
		};
	}
	let l = new Set(c), u = new Set(c);
	for (let e = 0; e < r && u.size > 0; e++) {
		let e = /* @__PURE__ */ new Set();
		for (let t of s) u.has(t.source) && !l.has(t.target) && e.add(t.target), u.has(t.target) && !l.has(t.source) && e.add(t.source);
		e.forEach((e) => l.add(e)), u = e;
	}
	let d = new Set(s.filter((e) => l.has(e.source) && l.has(e.target)));
	return {
		people: e.filter((e) => l.has(e.id)),
		relationships: t.filter((e) => d.has(e))
	};
}
//#endregion
//#region src/components/graph/org/OrgGraph.tsx
var So = .3, Co = 3, wo = 1.25, To = 32, Eo = 40;
function Do(e, t) {
	let n = oo(e);
	if (t.size === 0) return n;
	let r = 0;
	return n.forEach((e, n) => {
		t.has(n) || (r = Math.max(r, e));
	}), r === 0 || t.forEach((e) => {
		n.has(e) && n.set(e, Math.min(n.get(e) ?? 0, r));
	}), n;
}
function Oo({ people: e, relationships: n, departments: r, onPersonSelect: i, multiSelectIds: a, onToggleMultiSelect: o, spotlightIds: s, layout: c, presenceFilter: l, showInfluence: u = !1, legend: d = !0, controls: f = !0, focusIds: p, focusHops: m = 1, pruneToFocus: h = !0, fitInset: g, minFitZoom: _ = ai, ref: v, className: b, "aria-label": x = "Org graph", "data-testid": S = "org-graph" }) {
	let C = q(null), w = `org-arrow-${ye().replace(/:/g, "")}`, [T, E] = J({
		width: 800,
		height: 600
	}), [D, O] = J(null), [k, A] = J(null), [j, ee] = J(null), [M, N] = J({
		x: 0,
		y: 0,
		scale: 1
	}), [P, te] = J(!1), F = q({
		x: 0,
		y: 0
	});
	G(() => {
		let e = C.current;
		if (!e || typeof ResizeObserver > "u") return;
		let t = new ResizeObserver((e) => {
			let t = e[0];
			t && t.contentRect.width > 0 && t.contentRect.height > 0 && E({
				width: t.contentRect.width,
				height: t.contentRect.height
			});
		});
		return t.observe(e), () => t.disconnect();
	}, []);
	let I = p ? [...p].sort().join("\0") : "", L = K(() => I && h ? xo(e, n, I.split("\0"), { hops: m }) : {
		people: e,
		relationships: n
	}, [
		e,
		n,
		I,
		m,
		h
	]), ne = K(() => new Set(I ? I.split("\0").filter((e) => L.people.some((t) => t.id === e)) : []), [I, L]), R = K(() => j ? L.people.filter((e) => e.department === j) : L.people, [L, j]), re = K(() => {
		if (!j) return L.relationships;
		let e = new Set(R.map((e) => e.id));
		return L.relationships.filter((t) => e.has(t.source) && e.has(t.target));
	}, [
		L,
		R,
		j
	]), z = K(() => {
		let e = new Set(R.map((e) => e.id));
		return Do(re.filter((t) => e.has(t.source) && e.has(t.target)), ne);
	}, [
		R,
		re,
		ne
	]), ie = K(() => so(z), [z]), B = K(() => ({
		left: g?.left ?? (d ? 200 : 0),
		right: g?.right ?? 0,
		top: g?.top ?? 0,
		bottom: g?.bottom ?? 0
	}), [
		g?.left,
		g?.right,
		g?.top,
		g?.bottom,
		d
	]), ae = K(() => f ? ci(B, T, si) : B, [
		B,
		f,
		T
	]), oe = K(() => pi(T, B, f ? si : null), [
		T,
		B,
		f
	]), se = Math.max(oi, _), ce = K(() => ({
		width: Math.max(160, (T.width - ae.left - ae.right - 64) / se),
		height: Math.max(120, (T.height - ae.top - ae.bottom - 64) / se)
	}), [
		T,
		ae,
		se
	]), { nodes: V, links: H, isSettled: le, isDone: ue } = ii({
		people: R,
		relationships: re,
		departments: r,
		width: ce.width,
		height: ce.height,
		layout: c,
		nodeRadiusOf: (e) => ao(u, e.influenceScore, z.get(e.id) ?? 0, ie)
	}), U = q(!0), de = q(!1), fe = K(() => R.map((e) => e.id).sort().join("\0"), [R]), pe = K(() => V.map((e) => e.id).sort().join("\0"), [V]), me = q(fe);
	G(() => {
		me.current !== fe && (me.current = fe, U.current = !0, de.current = !1, N({
			x: 0,
			y: 0,
			scale: 1
		}));
	}, [fe]);
	let he = W((e) => {
		let t = new Map(V.map((e) => [e.id, e]));
		return vi({
			nodes: V,
			radiusOf: (e) => ao(u, t.get(e)?.influenceScore ?? 0, z.get(e) ?? 0, ie),
			focus: ne,
			size: T,
			inset: ae,
			overlays: oe,
			layout: c ?? "force",
			mode: e ? "all" : "auto",
			floor: se,
			padding: To,
			maxZoom: wo
		});
	}, [
		V,
		u,
		z,
		ie,
		ne,
		T,
		ae,
		oe,
		c,
		se
	]);
	G(() => {
		if (!U.current || !le || pe !== fe) return;
		let e = he(de.current);
		e && N((t) => Math.abs(t.x - e.x) < .5 && Math.abs(t.y - e.y) < .5 && Math.abs(t.scale - e.scale) < .001 ? t : e);
	}, [
		he,
		le,
		ue,
		pe,
		fe
	]);
	let ge = W(() => {
		let e = he(!0);
		e && (U.current = !0, de.current = !0, N(e));
	}, [he]);
	be(v, () => ({ fitAll: ge }), [ge]);
	let _e = W((e) => {
		if (!e) return /* @__PURE__ */ new Set();
		let t = /* @__PURE__ */ new Set([e]);
		return H.forEach((n) => {
			n.source.id === e && t.add(n.target.id), n.target.id === e && t.add(n.source.id);
		}), t;
	}, [H]), ve = k ?? D, Y = ne.size > 0 ? /* @__PURE__ */ new Set([...s ?? [], ...ne]) : s, xe = !!Y && Y.size > 0, Se = xe ? /* @__PURE__ */ new Set([...Y ?? [], ...Array.from(_e(ve))]) : _e(ve), Ce = W((t) => {
		if (o) {
			o(t);
			return;
		}
		let n = D === t ? null : t;
		O(n);
		let r = e.find((e) => e.id === n);
		i?.(r ?? null);
	}, [
		D,
		e,
		i,
		o
	]), we = W((e) => {
		U.current = !1;
		let t = e.deltaY > 0 ? .9 : 1.1;
		N((e) => ko(e, Math.max(So, Math.min(Co, e.scale * t)), T));
	}, [T]), Q = W((e) => {
		(e.target === e.currentTarget || e.target.tagName === "svg") && (te(!0), U.current = !1, F.current = {
			x: e.clientX - M.x,
			y: e.clientY - M.y
		});
	}, [M]), Te = W((e) => {
		P && N((t) => ({
			...t,
			x: e.clientX - F.current.x,
			y: e.clientY - F.current.y
		}));
	}, [P]), $ = W(() => te(!1), []), Ee = k ? V.find((e) => e.id === k) : null, De = (e, t) => ao(u, t, z.get(e) ?? 0, ie);
	return /* @__PURE__ */ Z(y, {
		ref: C,
		gap: "none",
		"data-testid": S,
		className: t("relative h-full w-full overflow-hidden bg-surface", b),
		children: [
			/* @__PURE__ */ Z("svg", {
				width: T.width,
				height: T.height,
				role: "group",
				"aria-label": x,
				onWheel: we,
				onMouseDown: Q,
				onMouseMove: Te,
				onMouseUp: $,
				onMouseLeave: $,
				className: P ? "cursor-grabbing" : "cursor-grab",
				children: [/* @__PURE__ */ X("defs", { children: /* @__PURE__ */ X("marker", {
					id: w,
					markerWidth: "14",
					markerHeight: "10",
					refX: "13",
					refY: "5",
					orient: "auto",
					markerUnits: "userSpaceOnUse",
					children: /* @__PURE__ */ X("path", {
						d: "M0,0 L14,5 L0,10 Z",
						fill: "var(--color-text-tertiary)"
					})
				}) }), /* @__PURE__ */ Z("g", {
					transform: `translate(${M.x}, ${M.y}) scale(${M.scale})`,
					children: [H.map((e) => /* @__PURE__ */ X(mo, {
						source: e.source,
						target: e.target,
						type: e.type,
						strength: e.strength,
						targetRadius: De(e.target.id, e.target.influenceScore),
						arrowMarkerId: w,
						isHighlighted: !ve || Se.has(e.source.id) && Se.has(e.target.id)
					}, `${e.source.id}-${e.target.id}-${e.type}`)), V.map((e) => {
						let t = a ? a.has(e.id) : D === e.id, n = xe ? Se.has(e.id) : !ve || Se.has(e.id), i = n || t || V.length <= Eo;
						return /* @__PURE__ */ X(po, {
							node: e,
							departments: r,
							isSelected: t,
							isHighlighted: n,
							onSelect: Ce,
							onHover: A,
							presenceFilter: l,
							showInfluence: u,
							degree: z.get(e.id) ?? 0,
							maxDegree: ie,
							showLabel: i
						}, e.id);
					})]
				})]
			}),
			d && /* @__PURE__ */ X(yo, {
				departments: r,
				filter: j,
				onFilter: ee,
				presenceFilter: l
			}),
			Ee && /* @__PURE__ */ X(go, {
				node: Ee,
				departments: r,
				x: Ee.x * M.scale + M.x,
				y: Ee.y * M.scale + M.y,
				containerWidth: T.width,
				showInfluence: u
			}),
			f && /* @__PURE__ */ X(ht, {
				className: "absolute bottom-3 right-3",
				zoom: M.scale,
				minZoom: So,
				maxZoom: Co,
				onZoomIn: () => {
					U.current = !1, N((e) => ko(e, Math.min(Co, e.scale * 1.2), T));
				},
				onZoomOut: () => {
					U.current = !1, N((e) => ko(e, Math.max(So, e.scale * .8), T));
				},
				onFit: ge,
				"data-testid": `${S}-zoom`
			})
		]
	});
}
function ko(e, t, n) {
	let r = n.width / 2, i = n.height / 2, a = t / e.scale;
	return {
		x: r - (r - e.x) * a,
		y: i - (i - e.y) * a,
		scale: t
	};
}
//#endregion
//#region src/components/graph/org/graphOverlay.tsx
function Ao({ children: e, "aria-label": t, "data-testid": n }) {
	return /* @__PURE__ */ X(_, {
		gap: "md",
		align: "center",
		wrap: !0,
		role: "region",
		"aria-label": t,
		"data-testid": n,
		className: "border-b border-border bg-primary-bg px-3 py-1.5 text-[12px] text-text-primary",
		children: e
	});
}
function jo({ children: e, tone: n = "default", className: r }) {
	return /* @__PURE__ */ X(ce, {
		className: t("whitespace-nowrap", n === "warning" && "text-warning", r),
		children: e
	});
}
//#endregion
//#region src/components/graph/org/GraphSearchBox.tsx
function Mo({ people: e, onPickPerson: n, onPickSkill: i, placeholder: a = "Find a person or skill…", className: o }) {
	let [s, c] = J(""), [l, u] = J(!1), [d, f] = J(0), p = q(null), m = `graph-search-${ye().replace(/:/g, "")}`;
	G(() => {
		if (!l) return;
		let e = (e) => {
			p.current && !p.current.contains(e.target) && u(!1);
		};
		return document.addEventListener("mousedown", e), () => document.removeEventListener("mousedown", e);
	}, [l]);
	let { personMatches: h, skillMatches: g } = K(() => Wa(e, s), [s, e]), _ = h.length + g.length, v = s.trim().length > 0;
	function b(e) {
		if (e < h.length) {
			let t = h[e];
			if (!t) return;
			n(t.id);
		} else {
			let t = g[e - h.length];
			if (!t) return;
			i(t.skill, t.personIds);
		}
		c(""), u(!1), f(0);
	}
	let x = l && v && _ > 0;
	return /* @__PURE__ */ Z(y, {
		ref: p,
		gap: "none",
		className: t("relative", o),
		"data-testid": "graph-search-box",
		children: [
			/* @__PURE__ */ X(S, {
				type: "search",
				role: "combobox",
				"aria-expanded": x,
				"aria-controls": x ? m : void 0,
				"aria-activedescendant": x ? `${m}-${d}` : void 0,
				"aria-autocomplete": "list",
				"aria-label": "Find a person or skill",
				placeholder: a,
				value: s,
				className: "w-[210px] rounded-full",
				onChange: (e) => {
					c(e.target.value), u(!0), f(0);
				},
				onFocus: () => u(!0),
				onKeyDown: (e) => {
					e.key === "ArrowDown" ? (e.preventDefault(), f((e) => Math.min(e + 1, _ - 1))) : e.key === "ArrowUp" ? (e.preventDefault(), f((e) => Math.max(e - 1, 0))) : e.key === "Enter" && _ > 0 ? (e.preventDefault(), b(d)) : e.key === "Escape" && (u(!1), c(""));
				}
			}),
			x && /* @__PURE__ */ Z(y, {
				gap: "none",
				role: "listbox",
				"data-ui-listbox": "graph-search",
				id: m,
				"aria-label": "Matches",
				className: "absolute left-0 top-[calc(100%+6px)] z-[120] max-h-[340px] w-[290px] overflow-y-auto rounded-lg border border-border bg-surface py-1 shadow-md",
				children: [
					h.map((e, t) => /* @__PURE__ */ X(B, {
						id: `${m}-${t}`,
						active: d === t,
						onHighlight: () => f(t),
						onPick: () => b(t),
						primary: e.name,
						secondary: `${e.title} · ${e.department}`
					}, e.id)),
					g.length > 0 && /* @__PURE__ */ X(y, {
						gap: "none",
						className: "px-3 pb-1 pt-1.5",
						role: "presentation",
						children: /* @__PURE__ */ X(jo, { children: "Skills" })
					}),
					g.map((e, t) => {
						let n = h.length + t;
						return /* @__PURE__ */ X(B, {
							id: `${m}-${n}`,
							active: d === n,
							onHighlight: () => f(n),
							onPick: () => b(n),
							primary: e.skill,
							secondary: `${e.personIds.length} people`
						}, e.skill);
					})
				]
			}),
			l && v && _ === 0 && /* @__PURE__ */ X(y, {
				role: "status",
				className: "absolute left-0 top-[calc(100%+6px)] z-[120] w-[290px] rounded-lg border border-border bg-surface shadow-md",
				children: /* @__PURE__ */ X(r, {
					density: "compact",
					children: /* @__PURE__ */ X(T, {
						title: `No matches for "${s}"`,
						body: "Try a different name, title, department, or skill.",
						actionLabel: "Clear search",
						onAction: () => {
							c(""), u(!1);
						}
					})
				})
			})
		]
	});
}
//#endregion
//#region src/components/graph/org/PersonDetailCard.tsx
function No(e) {
	let t = Date.parse(e);
	if (Number.isNaN(t)) return e;
	let n = Math.max(0, (Date.now() - t) / 1e3);
	return n < 60 ? "just now" : n < 3600 ? `${Math.floor(n / 60)}m ago` : n < 86400 ? `${Math.floor(n / 3600)}h ago` : n < 604800 ? `${Math.floor(n / 86400)}d ago` : new Date(t).toLocaleDateString(void 0, {
		month: "short",
		day: "numeric",
		year: "numeric"
	});
}
function Po({ person: e, evidence: r = [], loading: a = !1, error: o, onClose: c, onFocusPerson: u, onAsk: d, showInfluence: f = !1, formatTime: p = No, askLabel: h = (e) => `Ask agent about ${qa(e.name)} →`, className: g, "data-testid": v = "person-detail-card" }) {
	let b = K(() => e ? [...e.connections].filter((e) => e.otherPerson).sort((e, t) => t.strength - e.strength).slice(0, 8) : [], [e]), x = Math.max(...b.map((e) => e.strength), .001);
	return /* @__PURE__ */ X(i, {
		padding: "md",
		"data-testid": v,
		"aria-label": e ? `${e.name} details` : "Person details",
		role: "region",
		className: t("absolute right-3 top-3 z-[60] max-h-[calc(100%-24px)] w-[300px] overflow-y-auto shadow-lg", g),
		children: /* @__PURE__ */ Z(y, {
			gap: "md",
			children: [/* @__PURE__ */ Z(_, {
				gap: "sm",
				justify: "between",
				align: "start",
				wrap: !1,
				children: [/* @__PURE__ */ Z(y, {
					gap: "none",
					className: "min-w-0 flex-1",
					children: [
						a && !e && /* @__PURE__ */ X(D, {
							label: "Loading…",
							spinnerSize: "sm"
						}),
						o && /* @__PURE__ */ X(F, {
							tone: "error",
							children: o
						}),
						e && /* @__PURE__ */ X(I, {
							title: e.name,
							subtitle: e.department ? `${e.title} · ${e.department}` : e.title
						})
					]
				}), /* @__PURE__ */ X(l, {
					"aria-label": "Close details",
					size: "sm",
					variant: "ghost",
					onClick: c,
					children: /* @__PURE__ */ X(m, { size: 14 })
				})]
			}), e && /* @__PURE__ */ Z(Y, { children: [
				/* @__PURE__ */ X(H, {
					size: "sm",
					items: [
						f && `influence ${e.influenceScore.toFixed(2)}`,
						`${e.connections.length} connections`,
						f && e.scoredAt ? `scored ${e.scoredAt.slice(0, 10)}` : null
					]
				}),
				e.skills.length > 0 && /* @__PURE__ */ Z(y, {
					gap: "xs",
					children: [/* @__PURE__ */ X(I, { title: "Skills" }), /* @__PURE__ */ X(_, {
						gap: "xs",
						wrap: !0,
						children: e.skills.map((e) => /* @__PURE__ */ X(s, {
							tone: "info",
							size: "xs",
							children: e
						}, e))
					})]
				}),
				b.length > 0 && /* @__PURE__ */ Z(y, {
					gap: "xs",
					children: [/* @__PURE__ */ X(I, { title: "Strongest connections" }), /* @__PURE__ */ X(y, {
						gap: "none",
						children: b.map((e, t) => {
							let n = e.otherPerson;
							return /* @__PURE__ */ X(oe, {
								onClick: () => u(n.id),
								title: `Add ${n.name} to selection`,
								label: n.name,
								note: Ba[e.type] ?? e.type,
								meter: /* @__PURE__ */ X(k, {
									value: e.strength / x,
									tone: "info",
									size: "sm",
									showLabel: !1,
									ariaLabel: `Connection strength ${e.strength.toFixed(2)}`
								})
							}, `${n.id}-${e.type}-${t}`);
						})
					})]
				}),
				r.length > 0 && /* @__PURE__ */ Z(y, {
					gap: "xs",
					children: [/* @__PURE__ */ X(I, {
						title: "Evidence",
						subtitle: `${r.length} documents`
					}), /* @__PURE__ */ X(y, {
						gap: "xs",
						children: r.slice(0, 6).map((e) => /* @__PURE__ */ Z(y, {
							gap: "none",
							className: "min-w-0",
							children: [/* @__PURE__ */ Z(_, {
								gap: "xs",
								align: "center",
								wrap: !1,
								children: [
									/* @__PURE__ */ X(s, {
										size: "xs",
										uppercase: !0,
										children: e.source || "doc"
									}),
									/* @__PURE__ */ X("span", {
										title: e.title,
										className: "min-w-0 flex-1 truncate text-[11px] text-text-primary",
										children: e.title
									}),
									e.mentionCount > 1 && /* @__PURE__ */ Z("span", {
										className: "shrink-0 text-[10px] tabular-nums text-text-tertiary",
										children: ["×", e.mentionCount]
									})
								]
							}), /* @__PURE__ */ X(H, {
								size: "xs",
								items: [e.ingestedAt ? p(e.ingestedAt) : null]
							})]
						}, e.id))
					})]
				}),
				/* @__PURE__ */ X(n, {
					variant: "primary",
					size: "sm",
					fullWidth: !0,
					onClick: () => d(e.id),
					children: h(e)
				})
			] })]
		})
	});
}
//#endregion
//#region src/components/graph/org/connectionPath.ts
var Fo = {
	collaborates: "collaborates with",
	mentors: "mentors",
	reports_to: "reports to",
	expert_in_common: "shares expertise with"
};
function Io(e, t, n, r) {
	if (n === r) return null;
	let i = new Map(e.map((e) => [e.id, e]));
	if (!i.has(n) || !i.has(r)) return null;
	let a = /* @__PURE__ */ new Map(), o = (e, t, n) => {
		let r = a.get(e);
		r ? r.push({
			other: t,
			type: n
		}) : a.set(e, [{
			other: t,
			type: n
		}]);
	};
	for (let e of t) o(e.source, e.target, e.type), o(e.target, e.source, e.type);
	let s = /* @__PURE__ */ new Map(), c = /* @__PURE__ */ new Set([n]), l = [n], u = !1;
	for (; l.length > 0 && !u;) {
		let e = [];
		for (let t of l) {
			for (let { other: n, type: i } of a.get(t) ?? []) if (!c.has(n)) {
				if (c.add(n), s.set(n, {
					from: t,
					type: i
				}), n === r) {
					u = !0;
					break;
				}
				e.push(n);
			}
			if (u) break;
		}
		l = e;
	}
	if (!u) return null;
	let d = [], f = r;
	for (; f !== n;) {
		let e = s.get(f);
		d.unshift({
			person: i.get(f),
			viaType: e.type
		}), f = e.from;
	}
	return d.unshift({
		person: i.get(n),
		viaType: ""
	}), d;
}
//#endregion
//#region src/components/graph/org/ConnectionPathStrip.tsx
function Lo({ path: e, onHighlightPath: t }) {
	let r = e.length - 2;
	return /* @__PURE__ */ Z(Ao, {
		"aria-label": "Connection path",
		"data-testid": "connection-path-strip",
		children: [
			/* @__PURE__ */ X("span", {
				className: "whitespace-nowrap font-semibold text-primary",
				children: r === 0 ? "Directly connected" : `Connected via ${r} ${r === 1 ? "person" : "people"}`
			}),
			/* @__PURE__ */ X(_, {
				gap: "xs",
				align: "center",
				wrap: !0,
				className: "min-w-0",
				children: e.map((t, n) => /* @__PURE__ */ Z(_, {
					gap: "xs",
					align: "center",
					wrap: !1,
					as: "span",
					children: [n > 0 && /* @__PURE__ */ Z("span", {
						className: "whitespace-nowrap text-[10px] text-text-tertiary",
						children: [
							"—",
							Fo[t.viaType] ?? t.viaType,
							"→"
						]
					}), /* @__PURE__ */ X("span", {
						className: n === 0 || n === e.length - 1 ? "whitespace-nowrap font-bold" : "whitespace-nowrap font-medium",
						children: t.person.name
					})]
				}, t.person.id))
			}),
			r > 0 && /* @__PURE__ */ X("span", {
				className: "ml-auto",
				children: /* @__PURE__ */ X(n, {
					variant: "primary",
					size: "sm",
					onClick: () => t(e.map((e) => e.person.id)),
					children: "Show path on graph"
				})
			})
		]
	});
}
//#endregion
//#region src/components/graph/org/DepartmentChips.tsx
function Ro({ departments: e, people: t, activeDepartment: n, onToggle: r, className: i }) {
	let a = K(() => Ga(t), [t]);
	return /* @__PURE__ */ X(_, {
		gap: "xs",
		align: "center",
		wrap: !0,
		as: "span",
		className: i,
		"data-testid": "department-chips",
		children: e.map((e) => {
			let t = a.get(e.name) ?? [];
			if (t.length === 0) return null;
			let i = n === e.name;
			return /* @__PURE__ */ Z(A, {
				active: i,
				color: e.color,
				dot: !0,
				size: "sm",
				onClick: () => r(i ? null : e.name, t),
				children: [e.name, /* @__PURE__ */ X("span", {
					className: "ml-1 text-[10px] tabular-nums text-text-tertiary",
					children: t.length
				})]
			}, e.id);
		})
	});
}
//#endregion
//#region src/components/graph/org/DepartmentInsightStrip.tsx
function zo({ department: e, people: t, onFocusPerson: r, busFactorFindings: i, busFactorFindingsUnavailable: a, findingHref: o = Qa, onNavigate: s }) {
	let { members: c, topSkills: l, atRisk: u } = K(() => e ? Ka(t, e) : {
		members: t,
		topSkills: [],
		...Ya(t)
	}, [e, t]), d = (e) => (t) => {
		!s || t.defaultPrevented || t.button !== 0 || t.metaKey || t.ctrlKey || t.shiftKey || t.altKey || (t.preventDefault(), s(e, t));
	};
	return /* @__PURE__ */ Z(Ao, {
		"aria-label": e ? `${e} insight` : "Org-wide rare skills",
		"data-testid": "department-insight-strip",
		children: [
			/* @__PURE__ */ X("span", {
				className: "whitespace-nowrap font-bold",
				children: e ? /* @__PURE__ */ Z(Y, { children: [
					e,
					" · ",
					c.length,
					" people"
				] }) : "Rare skills · org-wide"
			}),
			l.length > 0 && /* @__PURE__ */ Z(_, {
				gap: "xs",
				align: "center",
				wrap: !0,
				as: "span",
				className: "text-text-secondary",
				children: [/* @__PURE__ */ X(jo, { children: "Top skills" }), l.map(([e, t]) => /* @__PURE__ */ Z("span", {
					className: "whitespace-nowrap",
					children: [
						e,
						" ",
						/* @__PURE__ */ Z("span", {
							className: "text-[10px] tabular-nums text-text-tertiary",
							children: [
								"(",
								t,
								")"
							]
						})
					]
				}, e))]
			}),
			u.length > 0 && /* @__PURE__ */ Z(_, {
				gap: "xs",
				align: "center",
				wrap: !0,
				as: "span",
				children: [/* @__PURE__ */ X(jo, {
					tone: "warning",
					children: "⚠ rare skills"
				}), u.map(({ skill: e, holder: t, holderCount: a }) => {
					let s = i ? to(i, e) : void 0, c = s !== null, l = c ? o(e, s?.id) : "";
					return /* @__PURE__ */ Z(_, {
						gap: "none",
						align: "center",
						as: "span",
						className: "whitespace-nowrap",
						children: [/* @__PURE__ */ Z(n, {
							variant: "ghost",
							size: "sm",
							className: "text-warning",
							title: `${e} — only ${a} ${a === 1 ? "person" : "people"} org-wide. Click to focus ${t.name}.`,
							onClick: () => r(t.id),
							children: [
								e,
								" · ",
								qa(t.name)
							]
						}), c ? /* @__PURE__ */ X(V, {
							href: l,
							onClick: d(l),
							title: s ? `Open the bus-factor finding the sweep filed for ${e}` : `See the bus-factor finding for ${e}`,
							className: "text-[11px]",
							children: "finding →"
						}) : /* @__PURE__ */ X("span", {
							className: "text-[11px] italic text-text-tertiary",
							title: `The scheduled bus-factor sweep hasn't flagged ${e} — this read is live from the graph, the sweep runs on a schedule, and they can disagree.`,
							children: "not on the sweep yet"
						})]
					}, `${e}-${t.id}`);
				})]
			}),
			u.length > 0 && a && /* @__PURE__ */ X(H, {
				size: "xs",
				tone: "secondary",
				items: ["Could not read the bus-factor sweep — showing every rare skill from the live graph instead."]
			})
		]
	});
}
//#endregion
export { hr as $, Wa as A, nt as At, Fi as B, eo as C, ft as Ct, Ya as D, ct as Dt, ao as E, ut as Et, yi as F, Be as Ft, li as G, si as H, Ii as I, Ve as It, ii as J, Jr as K, Ri as L, Si as M, He as Mt, xi as N, Ue as Nt, Ja as O, lt as Ot, bi as P, We as Pt, fr as Q, ta as R, qa as S, pt as St, Ga as T, st as Tt, oi as U, Li as V, ai as W, xr as X, Wr as Y, br as Z, Xa as _, At as _t, Io as a, Cn as at, Ka as b, vt as bt, Oo as c, mn as ct, yo as d, rn as dt, ur as et, co as f, Yt as ft, Za as g, jt as gt, Ba as h, Lt as ht, Fo as i, An as it, za as j, Qe as jt, Qa as k, Ye as kt, xo as l, yn as lt, uo as m, zt as mt, Ro as n, Jn as nt, Po as o, wn as ot, fo as p, Wt as pt, Qr as q, Lo as r, Kn as rt, Mo as s, hn as st, zo as t, Xn as tt, vo as u, on as ut, Va as v, Ot as vt, so as w, dt as wt, to as x, ht as xt, oo as y, yt, Pi as z };
