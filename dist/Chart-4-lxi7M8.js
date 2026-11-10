import { g as e } from "./safeHref-BL4Z8n8E.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
import { Area as r, AreaChart as i, Bar as a, BarChart as o, CartesianGrid as s, Cell as c, LabelList as l, Legend as u, Line as d, LineChart as f, ResponsiveContainer as p, Tooltip as m, XAxis as h, YAxis as g } from "recharts";
//#region src/components/shared/Chart.tsx
var _ = 180, v = 80, y = {
	fontSize: 10,
	fill: "var(--color-text-secondary)"
}, b = [
	"var(--color-primary)",
	"var(--color-success)",
	"var(--color-warning)",
	"var(--color-danger)",
	"var(--color-accent)"
], x = {
	fontSize: 10,
	fill: "var(--color-text-tertiary)"
}, S = {
	background: "var(--color-surface)",
	border: "1px solid var(--color-border)",
	borderRadius: 6,
	fontSize: 10,
	padding: "6px 8px",
	fontFamily: "inherit",
	color: "var(--color-text-primary)",
	boxShadow: "0 1px 2px rgba(15, 23, 42, 0.06)"
}, C = {
	fontSize: 10,
	color: "var(--color-text-secondary)",
	marginBottom: 2
}, w = {
	fontSize: 10,
	padding: 0
}, T = {
	fontSize: 12,
	color: "var(--color-text-secondary)",
	paddingBottom: 4
}, E = "var(--color-border)", D = .5;
function O(e) {
	let t = /* @__PURE__ */ new Map(), n = [];
	return (Array.isArray(e) ? e : []).forEach((e) => {
		(Array.isArray(e?.data) ? e.data : []).forEach((r) => {
			let i = t.get(r.x);
			i || (i = { x: r.x }, t.set(r.x, i), n.push(r.x)), i[e.label] = r.y;
		});
	}), n.map((e) => t.get(e));
}
function k(e, t) {
	return e.color ?? b[t % b.length];
}
function A({ series: e, height: r = _, yFormat: i, xFormat: a }) {
	let o = O(e);
	return /* @__PURE__ */ t(p, {
		width: "100%",
		height: r,
		children: /* @__PURE__ */ n(f, {
			data: o,
			margin: {
				top: 8,
				right: 12,
				bottom: 4,
				left: 4
			},
			children: [
				/* @__PURE__ */ t(s, {
					stroke: E,
					strokeOpacity: D,
					vertical: !1
				}),
				/* @__PURE__ */ t(h, {
					dataKey: "x",
					tick: x,
					stroke: "var(--color-border)",
					tickFormatter: a,
					minTickGap: 16
				}),
				/* @__PURE__ */ t(g, {
					tick: x,
					stroke: "var(--color-border)",
					tickFormatter: i,
					width: i ? 56 : 40
				}),
				/* @__PURE__ */ t(m, {
					contentStyle: S,
					labelStyle: C,
					itemStyle: w,
					labelFormatter: (e) => a ? a(e) : String(e),
					formatter: ((e) => {
						let t = typeof e == "number" ? e : Number(e);
						return i && Number.isFinite(t) ? i(t) : String(e);
					})
				}),
				/* @__PURE__ */ t(u, {
					verticalAlign: "top",
					align: "left",
					layout: "horizontal",
					wrapperStyle: T,
					iconSize: 8
				}),
				(Array.isArray(e) ? e : []).map((e, n) => /* @__PURE__ */ t(d, {
					type: "monotone",
					dataKey: e.label,
					name: e.label,
					stroke: k(e, n),
					strokeWidth: 2,
					dot: !1,
					isAnimationActive: !1
				}, e.label))
			]
		})
	});
}
function j({ series: e, height: a = _ }) {
	let o = O(e);
	return /* @__PURE__ */ t(p, {
		width: "100%",
		height: a,
		children: /* @__PURE__ */ n(i, {
			data: o,
			margin: {
				top: 8,
				right: 12,
				bottom: 4,
				left: 4
			},
			children: [
				/* @__PURE__ */ t(s, {
					stroke: E,
					strokeOpacity: D,
					vertical: !1
				}),
				/* @__PURE__ */ t(h, {
					dataKey: "x",
					tick: x,
					stroke: "var(--color-border)",
					minTickGap: 16
				}),
				/* @__PURE__ */ t(g, {
					tick: x,
					stroke: "var(--color-border)",
					width: 40
				}),
				/* @__PURE__ */ t(m, {
					contentStyle: S,
					labelStyle: C,
					itemStyle: w
				}),
				/* @__PURE__ */ t(u, {
					verticalAlign: "top",
					align: "left",
					layout: "horizontal",
					wrapperStyle: T,
					iconSize: 8
				}),
				(Array.isArray(e) ? e : []).map((e, n) => {
					let i = k(e, n);
					return /* @__PURE__ */ t(r, {
						type: "monotone",
						dataKey: e.label,
						name: e.label,
						stackId: "1",
						stroke: i,
						strokeWidth: 2,
						fill: i,
						fillOpacity: .25,
						isAnimationActive: !1
					}, e.label);
				})
			]
		})
	});
}
function M({ data: r, height: i, xKey: d, yKey: f, color: b, yFormat: O, variant: k = "default", showValues: A = !1 }) {
	return k === "compact" ? /* @__PURE__ */ t(p, {
		width: "100%",
		height: i ?? v,
		children: /* @__PURE__ */ n(o, {
			data: r,
			margin: {
				top: A ? 14 : 4,
				right: 4,
				bottom: 4,
				left: 4
			},
			children: [/* @__PURE__ */ t(m, {
				contentStyle: S,
				labelStyle: C,
				itemStyle: w,
				labelFormatter: ((e, t) => String(t?.[0]?.payload?.[d] ?? "")),
				formatter: ((e) => {
					let t = typeof e == "number" ? e : Number(e);
					return O && Number.isFinite(t) ? O(t) : String(e);
				})
			}), /* @__PURE__ */ n(a, {
				dataKey: f,
				name: f,
				radius: [
					4,
					4,
					0,
					0
				],
				isAnimationActive: !1,
				children: [r.map((n, r) => /* @__PURE__ */ t(c, { fill: n.tone ? e(n.tone) : b ?? "var(--color-primary)" }, r)), A && /* @__PURE__ */ t(l, {
					dataKey: f,
					position: "top",
					style: y,
					formatter: O ?? String
				})]
			})]
		})
	}) : /* @__PURE__ */ t(p, {
		width: "100%",
		height: i ?? _,
		children: /* @__PURE__ */ n(o, {
			data: r,
			margin: {
				top: 8,
				right: 12,
				bottom: 4,
				left: 4
			},
			children: [
				/* @__PURE__ */ t(s, {
					stroke: E,
					strokeOpacity: D,
					vertical: !1
				}),
				/* @__PURE__ */ t(h, {
					dataKey: d,
					tick: x,
					stroke: "var(--color-border)",
					minTickGap: 16
				}),
				/* @__PURE__ */ t(g, {
					tick: x,
					stroke: "var(--color-border)",
					tickFormatter: O,
					width: O ? 56 : 40
				}),
				/* @__PURE__ */ t(m, {
					contentStyle: S,
					labelStyle: C,
					itemStyle: w,
					formatter: ((e) => {
						let t = typeof e == "number" ? e : Number(e);
						return O && Number.isFinite(t) ? O(t) : String(e);
					})
				}),
				/* @__PURE__ */ t(u, {
					verticalAlign: "top",
					align: "left",
					layout: "horizontal",
					wrapperStyle: T,
					iconSize: 8
				}),
				/* @__PURE__ */ t(a, {
					dataKey: f,
					name: f,
					fill: b ?? "var(--color-primary)",
					isAnimationActive: !1
				})
			]
		})
	});
}
//#endregion
export { A as n, j as r, M as t };
