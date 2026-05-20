import { jsx as e, jsxs as f } from "react/jsx-runtime";
import { ResponsiveContainer as s, BarChart as C, CartesianGrid as d, XAxis as m, YAxis as p, Tooltip as S, Legend as h, Bar as O, LineChart as I, Line as w, AreaChart as z, Area as B } from "recharts";
const k = 180, L = [
  "#646cff",
  "#16a34a",
  "#f59e0b",
  "#dc2626",
  "#8b5cf6"
], c = {
  fontSize: 10,
  fill: "#94a3b8"
}, b = {
  background: "#ffffff",
  border: "1px solid #e2e8f0",
  borderRadius: 6,
  fontSize: 10,
  padding: "6px 8px",
  fontFamily: "inherit",
  color: "#0f172a",
  boxShadow: "0 1px 2px rgba(15, 23, 42, 0.06)"
}, g = {
  fontSize: 10,
  color: "#475569",
  marginBottom: 2
}, T = {
  fontSize: 10,
  padding: 0
}, y = {
  fontSize: 11,
  color: "#475569",
  paddingBottom: 4
}, u = "#e2e8f0", A = 0.5;
function x(r) {
  const o = /* @__PURE__ */ new Map(), a = [];
  return r.forEach((i) => {
    i.data.forEach((n) => {
      let t = o.get(n.x);
      t || (t = { x: n.x }, o.set(n.x, t), a.push(n.x)), t[i.label] = n.y;
    });
  }), a.map((i) => o.get(i));
}
function _(r, o) {
  return r.color ?? L[o % L.length];
}
function K({
  series: r,
  height: o = k,
  yFormat: a,
  xFormat: i
}) {
  const n = x(r);
  return /* @__PURE__ */ e(s, { width: "100%", height: o, children: /* @__PURE__ */ f(I, { data: n, margin: { top: 8, right: 12, bottom: 4, left: 4 }, children: [
    /* @__PURE__ */ e(
      d,
      {
        stroke: u,
        strokeOpacity: A,
        vertical: !1
      }
    ),
    /* @__PURE__ */ e(
      m,
      {
        dataKey: "x",
        tick: c,
        stroke: "#e2e8f0",
        tickFormatter: i,
        minTickGap: 16
      }
    ),
    /* @__PURE__ */ e(
      p,
      {
        tick: c,
        stroke: "#e2e8f0",
        tickFormatter: a,
        width: a ? 56 : 40
      }
    ),
    /* @__PURE__ */ e(
      S,
      {
        contentStyle: b,
        labelStyle: g,
        itemStyle: T,
        labelFormatter: (t) => i ? i(t) : String(t),
        formatter: ((t) => {
          const l = typeof t == "number" ? t : Number(t);
          return a && Number.isFinite(l) ? a(l) : String(t);
        })
      }
    ),
    /* @__PURE__ */ e(
      h,
      {
        verticalAlign: "top",
        align: "left",
        layout: "horizontal",
        wrapperStyle: y,
        iconSize: 8
      }
    ),
    r.map((t, l) => /* @__PURE__ */ e(
      w,
      {
        type: "monotone",
        dataKey: t.label,
        name: t.label,
        stroke: _(t, l),
        strokeWidth: 2,
        dot: !1,
        isAnimationActive: !1
      },
      t.label
    ))
  ] }) });
}
function N({
  series: r,
  height: o = k
}) {
  const a = x(r);
  return /* @__PURE__ */ e(s, { width: "100%", height: o, children: /* @__PURE__ */ f(z, { data: a, margin: { top: 8, right: 12, bottom: 4, left: 4 }, children: [
    /* @__PURE__ */ e(
      d,
      {
        stroke: u,
        strokeOpacity: A,
        vertical: !1
      }
    ),
    /* @__PURE__ */ e(
      m,
      {
        dataKey: "x",
        tick: c,
        stroke: "#e2e8f0",
        minTickGap: 16
      }
    ),
    /* @__PURE__ */ e(p, { tick: c, stroke: "#e2e8f0", width: 40 }),
    /* @__PURE__ */ e(
      S,
      {
        contentStyle: b,
        labelStyle: g,
        itemStyle: T
      }
    ),
    /* @__PURE__ */ e(
      h,
      {
        verticalAlign: "top",
        align: "left",
        layout: "horizontal",
        wrapperStyle: y,
        iconSize: 8
      }
    ),
    r.map((i, n) => {
      const t = _(i, n);
      return /* @__PURE__ */ e(
        B,
        {
          type: "monotone",
          dataKey: i.label,
          name: i.label,
          stackId: "1",
          stroke: t,
          strokeWidth: 2,
          fill: t,
          fillOpacity: 0.25,
          isAnimationActive: !1
        },
        i.label
      );
    })
  ] }) });
}
function P({
  data: r,
  height: o = k,
  xKey: a,
  yKey: i,
  color: n,
  yFormat: t
}) {
  return /* @__PURE__ */ e(s, { width: "100%", height: o, children: /* @__PURE__ */ f(C, { data: r, margin: { top: 8, right: 12, bottom: 4, left: 4 }, children: [
    /* @__PURE__ */ e(
      d,
      {
        stroke: u,
        strokeOpacity: A,
        vertical: !1
      }
    ),
    /* @__PURE__ */ e(
      m,
      {
        dataKey: a,
        tick: c,
        stroke: "#e2e8f0",
        minTickGap: 16
      }
    ),
    /* @__PURE__ */ e(
      p,
      {
        tick: c,
        stroke: "#e2e8f0",
        tickFormatter: t,
        width: t ? 56 : 40
      }
    ),
    /* @__PURE__ */ e(
      S,
      {
        contentStyle: b,
        labelStyle: g,
        itemStyle: T,
        formatter: ((l) => {
          const E = typeof l == "number" ? l : Number(l);
          return t && Number.isFinite(E) ? t(E) : String(l);
        })
      }
    ),
    /* @__PURE__ */ e(
      h,
      {
        verticalAlign: "top",
        align: "left",
        layout: "horizontal",
        wrapperStyle: y,
        iconSize: 8
      }
    ),
    /* @__PURE__ */ e(
      O,
      {
        dataKey: i,
        name: i,
        fill: n ?? "#646cff",
        isAnimationActive: !1
      }
    )
  ] }) });
}
export {
  P as B,
  K as L,
  N as S
};
