import { t as e } from "./cn-DhjIN-s0.js";
import { t } from "./Button-cRZd1Oud.js";
import { t as n } from "./Card-RQCeAPNU.js";
import { t as r } from "./IconButton-C3DMtvSx.js";
import { t as i } from "./Chip-YhQI5B9P.js";
import { t as a } from "./EmptyState-JzzL2z1E.js";
import { t as o } from "./Spinner-CLcq5z8N.js";
import { t as s } from "./SkeletonCard-CGe8XFPB.js";
import { t as c } from "./Avatar-BzicCOft.js";
import { t as l } from "./InlineAlert-Myf3oJZf.js";
import { useCallback as u, useEffect as d, useMemo as f, useRef as p, useState as m } from "react";
import { Fragment as h, jsx as g, jsxs as _ } from "react/jsx-runtime";
//#region src/components/graph/layout.ts
function v(e) {
	let t = e.find((e) => e.group === "center");
	if (t) return t;
	let n = null, r = !1;
	for (let t of e) typeof t.weight == "number" && (!n || t.weight > n.weight ? (n = t, r = !1) : t.weight === n.weight && (r = !0));
	return n && !r ? n : null;
}
function y(e) {
	let t = [];
	for (let n of e) {
		let e = n.group ?? "";
		e !== "center" && (t.includes(e) || t.push(e));
	}
	return t;
}
function b(e, t, n, r) {
	if (e.length === 0) return /* @__PURE__ */ new Map();
	switch (n) {
		case "grid": return S(e, r);
		case "force": return C(e, t, r);
		default: return x(e, r);
	}
}
function x(e, { width: t, height: n, padding: r = 40 }) {
	let i = /* @__PURE__ */ new Map(), a = t / 2, o = n / 2, s = v(e), c = e.filter((e) => e !== s);
	if (s && i.set(s.id, {
		x: a,
		y: o
	}), c.length === 0) return i;
	let l = y(c), u = /* @__PURE__ */ new Map();
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
				x: w(a + r * Math.cos(n)),
				y: w(o + r * Math.sin(n))
			});
		});
	}), i;
}
function S(e, { width: t, height: n, padding: r = 40 }) {
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
				x: w(n),
				y: w(u)
			});
		});
	}), i;
}
function C(e, t, { width: n, height: r, padding: i = 40 }) {
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
			x: w(b + (s[t] - p) * y),
			y: w(x + (c[t] - h) * y)
		});
	}), S;
}
function w(e) {
	return Math.round(e * 100) / 100;
}
//#endregion
//#region src/components/graph/NodeGraph.tsx
var T = 480, E = [
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
], D = {
	fill: "fill-primary",
	bg: "bg-primary"
};
function O(e, t) {
	if (e === "center") return D;
	let n = t.indexOf(e ?? "");
	return E[(n < 0 ? 0 : n) % E.length];
}
var k = .5, A = 4, j = {
	x: 0,
	y: 0,
	k: 1
};
function M({ nodes: t, edges: n, layout: i = "radial", selectedId: a = null, onSelect: o, height: s = 320, className: c, "data-testid": l = "node-graph" }) {
	let u = f(() => b(t, n, i, {
		width: 480,
		height: s
	}), [
		t,
		n,
		i,
		480,
		s
	]), x = f(() => y(t), [t]), S = f(() => v(t), [t]), C = f(() => N(t, S), [t, S]), [w, T] = m(j), [E, D] = m(null), M = p(null), L = p(null), [R, z] = m(!1), B = () => {
		let e = M.current?.getBoundingClientRect();
		return e && e.width > 0 ? 480 / e.width : 1;
	};
	d(() => {
		let e = M.current;
		if (!e) return;
		let t = (t) => {
			t.preventDefault();
			let n = e.getBoundingClientRect(), r = n.width > 0 ? 480 / n.width : 1, i = (t.clientX - n.left) * r, a = (t.clientY - n.top) * r;
			T((e) => {
				let n = F(e.k * (t.deltaY < 0 ? 1.1 : 1 / 1.1), k, A), r = n / e.k;
				return {
					k: n,
					x: i - (i - e.x) * r,
					y: a - (a - e.y) * r
				};
			});
		};
		return e.addEventListener("wheel", t, { passive: !1 }), () => e.removeEventListener("wheel", t);
	}, [480]);
	let V = (e) => {
		e.button === 0 && (L.current = {
			startX: e.clientX,
			startY: e.clientY,
			originX: w.x,
			originY: w.y
		}, z(!0));
	};
	d(() => {
		if (!R) return;
		let e = (e) => {
			let t = L.current;
			if (!t) return;
			let n = B();
			T((r) => ({
				...r,
				x: t.originX + (e.clientX - t.startX) * n,
				y: t.originY + (e.clientY - t.startY) * n
			}));
		}, t = () => {
			L.current = null, z(!1);
		};
		return window.addEventListener("mousemove", e), window.addEventListener("mouseup", t), () => {
			window.removeEventListener("mousemove", e), window.removeEventListener("mouseup", t);
		};
	}, [R]);
	let H = (e) => o?.(e), U = (e, t) => {
		(e.key === "Enter" || e.key === " ") && (e.preventDefault(), H(t));
	}, W = w.x === 0 && w.y === 0 && w.k === 1, G = f(() => new Map(t.map((e) => [e.id, e])), [t]);
	return /* @__PURE__ */ _("div", {
		className: e("relative flex flex-col overflow-hidden rounded-lg border border-border bg-surface", c),
		"data-testid": l,
		children: [
			/* @__PURE__ */ g("svg", {
				ref: M,
				role: "img",
				"aria-label": `Graph of ${t.length} nodes`,
				viewBox: `0 0 480 ${s}`,
				width: "100%",
				height: s,
				className: e("block select-none touch-none", R ? "cursor-grabbing" : "cursor-grab"),
				onMouseDown: V,
				"data-testid": `${l}-svg`,
				children: /* @__PURE__ */ _("g", {
					transform: `translate(${w.x} ${w.y}) scale(${w.k})`,
					"data-testid": `${l}-viewport`,
					children: [n.map((e, t) => {
						let n = u.get(e.from), r = u.get(e.to);
						if (!n || !r) return null;
						let i = a !== null && (e.from === a || e.to === a);
						return /* @__PURE__ */ _("g", {
							"data-testid": `${l}-edge-${e.from}-${e.to}`,
							children: [/* @__PURE__ */ g("line", {
								x1: n.x,
								y1: n.y,
								x2: r.x,
								y2: r.y,
								strokeWidth: P(e.weight),
								className: i ? "stroke-primary" : "stroke-border-emphasis"
							}), e.label && /* @__PURE__ */ g("text", {
								x: (n.x + r.x) / 2,
								y: (n.y + r.y) / 2 - 4,
								textAnchor: "middle",
								className: "fill-text-tertiary text-[10px]",
								"data-testid": `${l}-edge-label-${e.from}-${e.to}`,
								children: e.label
							})]
						}, `${e.from}->${e.to}#${t}`);
					}), t.map((t) => {
						let n = u.get(t.id);
						if (!n) return null;
						let r = C.get(t.id) ?? 16, i = t.id === a, o = O(t.group, x), s = `${l}-clip-${t.id}`;
						return /* @__PURE__ */ _("g", {
							role: "button",
							tabIndex: 0,
							"aria-label": t.sublabel ? `${t.label}, ${t.sublabel}` : t.label,
							"aria-pressed": i,
							transform: `translate(${n.x} ${n.y})`,
							className: "cursor-pointer outline-none",
							onClick: (e) => {
								e.stopPropagation(), H(t);
							},
							onMouseDown: (e) => e.stopPropagation(),
							onKeyDown: (e) => U(e, t),
							onFocus: () => D(t.id),
							onBlur: () => D((e) => e === t.id ? null : e),
							"data-testid": `${l}-node-${t.id}`,
							"data-selected": i || void 0,
							children: [
								/* @__PURE__ */ g("title", { children: t.sublabel ?? t.label }),
								(i || E === t.id) && /* @__PURE__ */ g("circle", {
									r: r + 4,
									className: e("fill-none", i ? "stroke-primary" : "stroke-border-emphasis"),
									strokeWidth: 2,
									strokeDasharray: i ? void 0 : "3 3"
								}),
								t.avatarUrl ? /* @__PURE__ */ _(h, { children: [
									/* @__PURE__ */ g("clipPath", {
										id: s,
										children: /* @__PURE__ */ g("circle", { r })
									}),
									/* @__PURE__ */ g("circle", {
										r,
										className: e("stroke-surface", o.fill),
										strokeWidth: 2
									}),
									/* @__PURE__ */ g("image", {
										href: t.avatarUrl,
										x: -r,
										y: -r,
										width: r * 2,
										height: r * 2,
										clipPath: `url(#${s})`,
										preserveAspectRatio: "xMidYMid slice"
									})
								] }) : /* @__PURE__ */ g("circle", {
									r,
									fill: t.color,
									className: e("stroke-surface", !t.color && o.fill),
									strokeWidth: 2
								}),
								!t.avatarUrl && /* @__PURE__ */ g("text", {
									y: 1,
									textAnchor: "middle",
									dominantBaseline: "middle",
									className: "pointer-events-none fill-white text-[10px] font-semibold",
									children: I(t.label)
								}),
								/* @__PURE__ */ g("text", {
									y: r + 12,
									textAnchor: "middle",
									className: "pointer-events-none fill-text-primary text-[11px]",
									children: t.label
								}),
								t === S && t.sublabel && /* @__PURE__ */ g("text", {
									y: r + 24,
									textAnchor: "middle",
									className: "pointer-events-none fill-text-tertiary text-[10px]",
									children: t.sublabel
								})
							]
						}, t.id);
					})]
				})
			}),
			/* @__PURE__ */ _("div", {
				className: "pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-2",
				children: [x.length > 0 && (x.length > 1 || x[0] !== "") ? /* @__PURE__ */ g("ul", {
					"aria-label": "Legend",
					className: "pointer-events-auto flex flex-wrap gap-x-3 gap-y-1 rounded-md bg-surface/85 px-2 py-1 text-[11px] text-text-secondary",
					"data-testid": `${l}-legend`,
					children: x.map((t) => /* @__PURE__ */ _("li", {
						className: "flex items-center gap-1",
						children: [/* @__PURE__ */ g("span", {
							"aria-hidden": !0,
							className: e("inline-block h-2 w-2 rounded-full", O(t, x).bg)
						}), t || "Other"]
					}, t || "(none)"))
				}) : /* @__PURE__ */ g("span", {}), /* @__PURE__ */ g(r, {
					size: "sm",
					"aria-label": "Reset view",
					title: "Reset view",
					disabled: W,
					onClick: () => T(j),
					className: "pointer-events-auto bg-surface/85",
					"data-testid": `${l}-reset`,
					children: "⟲"
				})]
			}),
			a && G.get(a) && /* @__PURE__ */ _("span", {
				className: "sr-only",
				"aria-live": "polite",
				children: ["Selected ", G.get(a).label]
			})
		]
	});
}
function N(e, t) {
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
function P(e) {
	return typeof e == "number" ? F(1 + e * 1.5, 1, 5) : 1.5;
}
function F(e, t, n) {
	return Math.min(n, Math.max(t, e));
}
function I(e) {
	let t = e.trim().split(/\s+/).filter(Boolean);
	return t.length === 0 ? "" : t.length === 1 ? t[0].slice(0, 2).toUpperCase() : (t[0][0] + t[t.length - 1][0]).toUpperCase();
}
//#endregion
//#region src/components/graph/PeopleGraph.tsx
var L = "__query__";
function R(e, t) {
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
function z(e, t) {
	let n = [{
		id: L,
		label: t?.trim() || "Everyone",
		sublabel: `${e.length} ${e.length === 1 ? "person" : "people"}`,
		group: "center"
	}], r = [];
	for (let i of e) {
		let e = R(i, t);
		n.push({
			id: i.id,
			label: i.name,
			sublabel: i.title,
			group: e,
			weight: i.score,
			avatarUrl: i.avatarUrl
		}), r.push({
			from: L,
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
function B({ people: r, query: o, onOpenPerson: s, onMessagePerson: l, graphHeight: u = 300, className: d, "data-testid": p = "people-graph" }) {
	let [h, v] = m(null), { nodes: b, edges: x } = f(() => z(r, o), [r, o]), S = f(() => y(b), [b]);
	return r.length === 0 ? /* @__PURE__ */ g(a, {
		size: "sm",
		icon: "🕸️",
		title: "No people found",
		body: o ? `Nothing matched “${o}”.` : "There is nobody to show yet.",
		testId: `${p}-empty`,
		className: d
	}) : /* @__PURE__ */ g("div", {
		className: e("@container flex min-h-0 flex-col gap-3 p-3", d),
		"data-testid": p,
		children: /* @__PURE__ */ _("div", {
			className: "flex min-h-0 flex-col gap-3 @lg:flex-row",
			children: [/* @__PURE__ */ g(M, {
				nodes: b,
				edges: x,
				layout: "radial",
				height: u,
				selectedId: h,
				onSelect: (e) => v(e.id === "__query__" ? null : e.id),
				className: "@lg:flex-1",
				"data-testid": `${p}-graph`
			}), /* @__PURE__ */ g("ul", {
				className: "flex min-w-0 flex-col gap-2 @lg:w-[260px] @lg:shrink-0",
				"aria-label": "People",
				"data-testid": `${p}-list`,
				children: r.map((r) => {
					let a = R(r, o), u = r.id === h;
					return /* @__PURE__ */ g("li", { children: /* @__PURE__ */ _(n, {
						padding: "none",
						className: e("flex cursor-pointer items-center gap-3 p-2", u && "ring-2 ring-primary"),
						onClick: () => v(u ? null : r.id),
						"data-testid": `${p}-row-${r.id}`,
						"data-selected": u || void 0,
						children: [
							/* @__PURE__ */ g("span", {
								className: e("h-2 w-2 shrink-0 rounded-full", O(a, S).bg),
								"aria-hidden": !0
							}),
							/* @__PURE__ */ g(c, {
								name: r.name,
								src: r.avatarUrl,
								size: 28
							}),
							/* @__PURE__ */ _("span", {
								className: "flex min-w-0 flex-1 flex-col",
								children: [
									/* @__PURE__ */ g("span", {
										className: "truncate text-[13px] font-medium text-text-primary",
										children: r.name
									}),
									r.title && /* @__PURE__ */ g("span", {
										className: "truncate text-[11px] text-text-tertiary",
										children: r.title
									}),
									a && /* @__PURE__ */ g("span", {
										className: "mt-0.5",
										children: /* @__PURE__ */ g(i, {
											size: "xs",
											children: a
										})
									})
								]
							}),
							/* @__PURE__ */ _("span", {
								className: "flex shrink-0 items-center gap-1",
								children: [l && /* @__PURE__ */ g(t, {
									size: "sm",
									variant: "secondary",
									onClick: (e) => {
										e.stopPropagation(), l(r.id);
									},
									"data-testid": `${p}-message-${r.id}`,
									children: "Message"
								}), s && /* @__PURE__ */ g(t, {
									size: "sm",
									variant: "ghost",
									onClick: (e) => {
										e.stopPropagation(), s(r.id);
									},
									"data-testid": `${p}-open-${r.id}`,
									children: "Open"
								})]
							})
						]
					}) }, r.id);
				})
			})]
		})
	});
}
//#endregion
//#region src/components/graph/graphPanelRenderer.tsx
function V(e) {
	return Array.isArray(e.people);
}
function H(e) {
	return (t, n) => /* @__PURE__ */ g(U, {
		panel: t,
		api: n,
		options: e
	});
}
function U({ panel: e, api: n, options: r }) {
	let { load: i, onOpenPerson: a, onMessagePerson: c, onSelectNode: f, graphHeight: p = 300, "data-testid": h = "graph-panel" } = r, [v, y] = m({ status: "loading" }), [b, x] = m(0), [S, C] = m(null);
	d(() => {
		let t = !1;
		return y({ status: "loading" }), i(e).then((e) => {
			t || (y({
				status: "ready",
				data: e
			}), e.title && n.setTitle(e.title));
		}, (e) => {
			t || y({
				status: "error",
				message: e instanceof Error ? e.message : String(e)
			});
		}), () => {
			t = !0;
		};
	}, [
		e.kind,
		e.id,
		b
	]);
	let w = u(() => x((e) => e + 1), []), T = {
		panel: e,
		api: n
	};
	if (v.status === "loading") return /* @__PURE__ */ _("div", {
		className: "relative flex flex-col gap-3 p-3",
		"data-testid": `${h}-loading`,
		"aria-busy": "true",
		children: [
			/* @__PURE__ */ g(s, {
				height: p,
				rounded: "lg"
			}),
			/* @__PURE__ */ g(s, { height: 44 }),
			/* @__PURE__ */ g(s, { height: 44 }),
			/* @__PURE__ */ g("div", {
				className: "absolute inset-0 flex items-center justify-center",
				children: /* @__PURE__ */ g(o, {
					size: "md",
					"aria-label": "Loading graph"
				})
			})
		]
	});
	if (v.status === "error") return /* @__PURE__ */ _("div", {
		className: "flex flex-col gap-2 p-3",
		"data-testid": `${h}-error`,
		children: [/* @__PURE__ */ _(l, {
			tone: "error",
			children: ["Could not load this graph: ", v.message]
		}), /* @__PURE__ */ g(t, {
			size: "sm",
			variant: "secondary",
			onClick: w,
			className: "self-start",
			"data-testid": `${h}-retry`,
			children: "Try again"
		})]
	});
	let { data: E } = v;
	return V(E) ? /* @__PURE__ */ g(B, {
		people: E.people,
		query: E.query ?? e.params?.q ?? e.params?.query,
		graphHeight: p,
		onOpenPerson: a ? (e) => a(e, T) : void 0,
		onMessagePerson: c ? (e) => c(e, T) : void 0,
		"data-testid": `${h}-people`
	}) : /* @__PURE__ */ g("div", {
		className: "p-3",
		"data-testid": `${h}-nodes`,
		children: /* @__PURE__ */ g(M, {
			nodes: E.nodes,
			edges: E.edges,
			layout: E.layout ?? "force",
			height: p,
			selectedId: S,
			onSelect: (e) => {
				C(e.id), f?.(e, T);
			},
			"data-testid": `${h}-graph`
		})
	});
}
//#endregion
export { B as a, T as c, v as d, y as f, L as i, M as l, H as n, R as o, b as p, V as r, z as s, U as t, O as u };
