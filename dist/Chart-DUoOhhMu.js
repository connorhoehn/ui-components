import { jsx as e, jsxs as t } from "react/jsx-runtime";
import { Area as n, AreaChart as r, Bar as i, BarChart as a, CartesianGrid as o, Legend as s, Line as c, LineChart as l, ResponsiveContainer as u, Tooltip as d, XAxis as f, YAxis as p } from "recharts";
//#region src/components/shared/Chart.tsx
var m = 180, h = [
	"var(--color-primary)",
	"var(--color-success)",
	"var(--color-warning)",
	"var(--color-danger)",
	"var(--color-accent)"
], g = {
	fontSize: 10,
	fill: "var(--color-text-tertiary)"
}, _ = {
	background: "var(--color-surface)",
	border: "1px solid var(--color-border)",
	borderRadius: 6,
	fontSize: 10,
	padding: "6px 8px",
	fontFamily: "inherit",
	color: "var(--color-text-primary)",
	boxShadow: "0 1px 2px rgba(15, 23, 42, 0.06)"
}, v = {
	fontSize: 10,
	color: "var(--color-text-secondary)",
	marginBottom: 2
}, y = {
	fontSize: 10,
	padding: 0
}, b = {
	fontSize: 11,
	color: "var(--color-text-secondary)",
	paddingBottom: 4
}, x = "var(--color-border)", S = .5;
function C(e) {
	let t = /* @__PURE__ */ new Map(), n = [];
	return (Array.isArray(e) ? e : []).forEach((e) => {
		(Array.isArray(e?.data) ? e.data : []).forEach((r) => {
			let i = t.get(r.x);
			i || (i = { x: r.x }, t.set(r.x, i), n.push(r.x)), i[e.label] = r.y;
		});
	}), n.map((e) => t.get(e));
}
function w(e, t) {
	return e.color ?? h[t % h.length];
}
function T({ series: n, height: r = m, yFormat: i, xFormat: a }) {
	let h = C(n);
	return /* @__PURE__ */ e(u, {
		width: "100%",
		height: r,
		children: /* @__PURE__ */ t(l, {
			data: h,
			margin: {
				top: 8,
				right: 12,
				bottom: 4,
				left: 4
			},
			children: [
				/* @__PURE__ */ e(o, {
					stroke: x,
					strokeOpacity: S,
					vertical: !1
				}),
				/* @__PURE__ */ e(f, {
					dataKey: "x",
					tick: g,
					stroke: "var(--color-border)",
					tickFormatter: a,
					minTickGap: 16
				}),
				/* @__PURE__ */ e(p, {
					tick: g,
					stroke: "var(--color-border)",
					tickFormatter: i,
					width: i ? 56 : 40
				}),
				/* @__PURE__ */ e(d, {
					contentStyle: _,
					labelStyle: v,
					itemStyle: y,
					labelFormatter: (e) => a ? a(e) : String(e),
					formatter: ((e) => {
						let t = typeof e == "number" ? e : Number(e);
						return i && Number.isFinite(t) ? i(t) : String(e);
					})
				}),
				/* @__PURE__ */ e(s, {
					verticalAlign: "top",
					align: "left",
					layout: "horizontal",
					wrapperStyle: b,
					iconSize: 8
				}),
				(Array.isArray(n) ? n : []).map((t, n) => /* @__PURE__ */ e(c, {
					type: "monotone",
					dataKey: t.label,
					name: t.label,
					stroke: w(t, n),
					strokeWidth: 2,
					dot: !1,
					isAnimationActive: !1
				}, t.label))
			]
		})
	});
}
function E({ series: i, height: a = m }) {
	let c = C(i);
	return /* @__PURE__ */ e(u, {
		width: "100%",
		height: a,
		children: /* @__PURE__ */ t(r, {
			data: c,
			margin: {
				top: 8,
				right: 12,
				bottom: 4,
				left: 4
			},
			children: [
				/* @__PURE__ */ e(o, {
					stroke: x,
					strokeOpacity: S,
					vertical: !1
				}),
				/* @__PURE__ */ e(f, {
					dataKey: "x",
					tick: g,
					stroke: "var(--color-border)",
					minTickGap: 16
				}),
				/* @__PURE__ */ e(p, {
					tick: g,
					stroke: "var(--color-border)",
					width: 40
				}),
				/* @__PURE__ */ e(d, {
					contentStyle: _,
					labelStyle: v,
					itemStyle: y
				}),
				/* @__PURE__ */ e(s, {
					verticalAlign: "top",
					align: "left",
					layout: "horizontal",
					wrapperStyle: b,
					iconSize: 8
				}),
				(Array.isArray(i) ? i : []).map((t, r) => {
					let i = w(t, r);
					return /* @__PURE__ */ e(n, {
						type: "monotone",
						dataKey: t.label,
						name: t.label,
						stackId: "1",
						stroke: i,
						strokeWidth: 2,
						fill: i,
						fillOpacity: .25,
						isAnimationActive: !1
					}, t.label);
				})
			]
		})
	});
}
function D({ data: n, height: r = m, xKey: c, yKey: l, color: h, yFormat: C }) {
	return /* @__PURE__ */ e(u, {
		width: "100%",
		height: r,
		children: /* @__PURE__ */ t(a, {
			data: n,
			margin: {
				top: 8,
				right: 12,
				bottom: 4,
				left: 4
			},
			children: [
				/* @__PURE__ */ e(o, {
					stroke: x,
					strokeOpacity: S,
					vertical: !1
				}),
				/* @__PURE__ */ e(f, {
					dataKey: c,
					tick: g,
					stroke: "var(--color-border)",
					minTickGap: 16
				}),
				/* @__PURE__ */ e(p, {
					tick: g,
					stroke: "var(--color-border)",
					tickFormatter: C,
					width: C ? 56 : 40
				}),
				/* @__PURE__ */ e(d, {
					contentStyle: _,
					labelStyle: v,
					itemStyle: y,
					formatter: ((e) => {
						let t = typeof e == "number" ? e : Number(e);
						return C && Number.isFinite(t) ? C(t) : String(e);
					})
				}),
				/* @__PURE__ */ e(s, {
					verticalAlign: "top",
					align: "left",
					layout: "horizontal",
					wrapperStyle: b,
					iconSize: 8
				}),
				/* @__PURE__ */ e(i, {
					dataKey: l,
					name: l,
					fill: h ?? "var(--color-primary)",
					isAnimationActive: !1
				})
			]
		})
	});
}
//#endregion
export { T as n, E as r, D as t };
