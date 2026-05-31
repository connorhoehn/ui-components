import { jsx as c, jsxs as a } from "react/jsx-runtime";
import { c as d } from "./cn-B6yFEsav.js";
const h = [
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
  const e = Math.abs(t) % h.length;
  return h[e];
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
  src: n,
  className: l,
  style: o,
  title: i
}) {
  const s = e || u(r), f = m(r);
  return /* @__PURE__ */ c(
    "div",
    {
      title: i ?? r,
      className: d(
        "inline-flex items-center justify-center rounded-full flex-shrink-0 font-semibold select-none overflow-hidden",
        l
      ),
      style: {
        width: t,
        height: t,
        background: s,
        color: "#fff",
        fontSize: t * 0.38,
        ...o
      },
      children: n ? /* @__PURE__ */ c(
        "img",
        {
          src: n,
          alt: r,
          width: t,
          height: t,
          className: "w-full h-full object-cover"
        }
      ) : f
    }
  );
}
function x({
  names: r,
  maxVisible: t = 5,
  size: e = 28,
  className: n
}) {
  const l = r.slice(0, t), o = r.length - l.length, i = -(e * 0.3);
  return /* @__PURE__ */ a("div", { className: d("inline-flex items-center", n), children: [
    l.map((s, f) => /* @__PURE__ */ c(
      p,
      {
        name: s,
        size: e,
        style: {
          marginLeft: f > 0 ? i : 0,
          border: "2px solid white"
        }
      },
      `${s}-${f}`
    )),
    o > 0 && /* @__PURE__ */ a(
      "div",
      {
        className: "inline-flex items-center justify-center rounded-full flex-shrink-0 font-semibold select-none bg-slate-200 text-slate-600",
        style: {
          width: e,
          height: e,
          fontSize: e * 0.38,
          marginLeft: i,
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
