import { jsx as r, jsxs as s } from "react/jsx-runtime";
import { ResponsiveContainer as d, BarChart as _, CartesianGrid as m, XAxis as p, YAxis as f, Tooltip as S, Legend as h, Bar as C, LineChart as O, Line as w, AreaChart as I, Area as z } from "recharts";
const b = 180, A = [
  "var(--color-primary)",
  "var(--color-success)",
  "var(--color-warning)",
  "var(--color-danger)",
  "var(--color-accent)"
], c = {
  fontSize: 10,
  fill: "var(--color-text-tertiary)"
}, k = {
  background: "var(--color-surface)",
  border: "1px solid var(--color-border)",
  borderRadius: 6,
  fontSize: 10,
  padding: "6px 8px",
  fontFamily: "inherit",
  color: "var(--color-text-primary)",
  boxShadow: "0 1px 2px rgba(15, 23, 42, 0.06)"
}, y = {
  fontSize: 10,
  color: "var(--color-text-secondary)",
  marginBottom: 2
}, g = {
  fontSize: 10,
  padding: 0
}, T = {
  fontSize: 11,
  color: "var(--color-text-secondary)",
  paddingBottom: 4
}, u = "var(--color-border)", v = 0.5;
function E(o) {
  const a = /* @__PURE__ */ new Map(), i = [];
  return o.forEach((e) => {
    e.data.forEach((n) => {
      let t = a.get(n.x);
      t || (t = { x: n.x }, a.set(n.x, t), i.push(n.x)), t[e.label] = n.y;
    });
  }), i.map((e) => a.get(e));
}
function L(o, a) {
  return o.color ?? A[a % A.length];
}
function R({
  series: o,
  height: a = b,
  yFormat: i,
  xFormat: e
}) {
  const n = E(o);
  return /* @__PURE__ */ r(d, { width: "100%", height: a, children: /* @__PURE__ */ s(O, { data: n, margin: { top: 8, right: 12, bottom: 4, left: 4 }, children: [
    /* @__PURE__ */ r(
      m,
      {
        stroke: u,
        strokeOpacity: v,
        vertical: !1
      }
    ),
    /* @__PURE__ */ r(
      p,
      {
        dataKey: "x",
        tick: c,
        stroke: "var(--color-border)",
        tickFormatter: e,
        minTickGap: 16
      }
    ),
    /* @__PURE__ */ r(
      f,
      {
        tick: c,
        stroke: "var(--color-border)",
        tickFormatter: i,
        width: i ? 56 : 40
      }
    ),
    /* @__PURE__ */ r(
      S,
      {
        contentStyle: k,
        labelStyle: y,
        itemStyle: g,
        labelFormatter: (t) => e ? e(t) : String(t),
        formatter: ((t) => {
          const l = typeof t == "number" ? t : Number(t);
          return i && Number.isFinite(l) ? i(l) : String(t);
        })
      }
    ),
    /* @__PURE__ */ r(
      h,
      {
        verticalAlign: "top",
        align: "left",
        layout: "horizontal",
        wrapperStyle: T,
        iconSize: 8
      }
    ),
    o.map((t, l) => /* @__PURE__ */ r(
      w,
      {
        type: "monotone",
        dataKey: t.label,
        name: t.label,
        stroke: L(t, l),
        strokeWidth: 2,
        dot: !1,
        isAnimationActive: !1
      },
      t.label
    ))
  ] }) });
}
function K({
  series: o,
  height: a = b
}) {
  const i = E(o);
  return /* @__PURE__ */ r(d, { width: "100%", height: a, children: /* @__PURE__ */ s(I, { data: i, margin: { top: 8, right: 12, bottom: 4, left: 4 }, children: [
    /* @__PURE__ */ r(
      m,
      {
        stroke: u,
        strokeOpacity: v,
        vertical: !1
      }
    ),
    /* @__PURE__ */ r(
      p,
      {
        dataKey: "x",
        tick: c,
        stroke: "var(--color-border)",
        minTickGap: 16
      }
    ),
    /* @__PURE__ */ r(f, { tick: c, stroke: "var(--color-border)", width: 40 }),
    /* @__PURE__ */ r(
      S,
      {
        contentStyle: k,
        labelStyle: y,
        itemStyle: g
      }
    ),
    /* @__PURE__ */ r(
      h,
      {
        verticalAlign: "top",
        align: "left",
        layout: "horizontal",
        wrapperStyle: T,
        iconSize: 8
      }
    ),
    o.map((e, n) => {
      const t = L(e, n);
      return /* @__PURE__ */ r(
        z,
        {
          type: "monotone",
          dataKey: e.label,
          name: e.label,
          stackId: "1",
          stroke: t,
          strokeWidth: 2,
          fill: t,
          fillOpacity: 0.25,
          isAnimationActive: !1
        },
        e.label
      );
    })
  ] }) });
}
function N({
  data: o,
  height: a = b,
  xKey: i,
  yKey: e,
  color: n,
  yFormat: t
}) {
  return /* @__PURE__ */ r(d, { width: "100%", height: a, children: /* @__PURE__ */ s(_, { data: o, margin: { top: 8, right: 12, bottom: 4, left: 4 }, children: [
    /* @__PURE__ */ r(
      m,
      {
        stroke: u,
        strokeOpacity: v,
        vertical: !1
      }
    ),
    /* @__PURE__ */ r(
      p,
      {
        dataKey: i,
        tick: c,
        stroke: "var(--color-border)",
        minTickGap: 16
      }
    ),
    /* @__PURE__ */ r(
      f,
      {
        tick: c,
        stroke: "var(--color-border)",
        tickFormatter: t,
        width: t ? 56 : 40
      }
    ),
    /* @__PURE__ */ r(
      S,
      {
        contentStyle: k,
        labelStyle: y,
        itemStyle: g,
        formatter: ((l) => {
          const x = typeof l == "number" ? l : Number(l);
          return t && Number.isFinite(x) ? t(x) : String(l);
        })
      }
    ),
    /* @__PURE__ */ r(
      h,
      {
        verticalAlign: "top",
        align: "left",
        layout: "horizontal",
        wrapperStyle: T,
        iconSize: 8
      }
    ),
    /* @__PURE__ */ r(
      C,
      {
        dataKey: e,
        name: e,
        fill: n ?? "var(--color-primary)",
        isAnimationActive: !1
      }
    )
  ] }) });
}
export {
  N as B,
  R as L,
  K as S
};
