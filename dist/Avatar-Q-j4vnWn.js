import { jsx as h, jsxs as c } from "react/jsx-runtime";
import { c as d } from "./cn-B6yFEsav.js";
const a = [
  "#4f7cff",
  "#22c55e",
  "#f59e0b",
  "#ef4444",
  "#a855f7",
  "#14b8a6",
  "#0ea5e9",
  "#f97316"
];
function u(r) {
  let t = 5381;
  for (let n = 0; n < r.length; n++)
    t = t * 33 ^ r.charCodeAt(n);
  const e = Math.abs(t) % a.length;
  return a[e];
}
function m(r) {
  const t = r.trim();
  if (!t) return "?";
  const e = t.split(/\s+/);
  if (e.length >= 2)
    return (e[0][0] + e[1][0]).toUpperCase();
  const n = e[0];
  return n.length >= 2 ? n[0].toUpperCase() + n[1].toLowerCase() : n[0].toUpperCase();
}
function p({
  name: r,
  size: t = 28,
  color: e,
  className: n,
  style: i,
  title: o
}) {
  const s = e || u(r), l = m(r);
  return /* @__PURE__ */ h(
    "div",
    {
      title: o ?? r,
      className: d(
        "inline-flex items-center justify-center rounded-full flex-shrink-0 font-semibold select-none",
        n
      ),
      style: {
        width: t,
        height: t,
        background: s,
        color: "#fff",
        fontSize: t * 0.38,
        ...i
      },
      children: l
    }
  );
}
function x({
  names: r,
  maxVisible: t = 5,
  size: e = 28,
  className: n
}) {
  const i = r.slice(0, t), o = r.length - i.length, s = -(e * 0.3);
  return /* @__PURE__ */ c("div", { className: d("inline-flex items-center", n), children: [
    i.map((l, f) => /* @__PURE__ */ h(
      p,
      {
        name: l,
        size: e,
        style: {
          marginLeft: f > 0 ? s : 0,
          border: "2px solid white"
        }
      },
      `${l}-${f}`
    )),
    o > 0 && /* @__PURE__ */ c(
      "div",
      {
        className: "inline-flex items-center justify-center rounded-full flex-shrink-0 font-semibold select-none bg-slate-200 text-slate-600",
        style: {
          width: e,
          height: e,
          fontSize: e * 0.38,
          marginLeft: s,
          border: "2px solid white"
        },
        title: `+${o} more`,
        children: [
          "+",
          o
        ]
      }
    )
  ] });
}
export {
  p as A,
  x as a,
  m as b,
  u as n
};
