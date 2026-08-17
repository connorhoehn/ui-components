import { jsx as h, jsxs as m } from "react/jsx-runtime";
import { c as b } from "./cn-B6yFEsav.js";
const u = [
  "#4f7cff",
  "#22c55e",
  "#f59e0b",
  "#ef4444",
  "#a855f7",
  "#14b8a6",
  "#0ea5e9",
  "#f97316"
];
function g(n) {
  let t = 5381;
  for (let e = 0; e < n.length; e++)
    t = t * 33 ^ n.charCodeAt(e);
  const r = Math.abs(t) % u.length;
  return u[r];
}
function p(n) {
  const t = n.trim();
  if (!t) return "?";
  const r = t.split(/\s+/);
  if (r.length >= 2)
    return (r[0][0] + r[1][0]).toUpperCase();
  const e = r[0];
  return e.length >= 2 ? e[0].toUpperCase() + e[1].toLowerCase() : e[0].toUpperCase();
}
function v({
  name: n,
  size: t = 28,
  initials: r,
  color: e,
  src: o,
  className: f,
  style: s,
  title: a
}) {
  const l = e || g(n), c = r ?? p(n);
  return /* @__PURE__ */ h(
    "div",
    {
      title: a ?? n,
      className: b(
        "inline-flex items-center justify-center rounded-full flex-shrink-0 font-semibold select-none overflow-hidden",
        f
      ),
      style: {
        width: t,
        height: t,
        background: l,
        color: "#fff",
        fontSize: t * 0.38,
        ...s
      },
      children: o ? /* @__PURE__ */ h(
        "img",
        {
          src: o,
          alt: n,
          width: t,
          height: t,
          className: "w-full h-full object-cover"
        }
      ) : c
    }
  );
}
function A({
  names: n,
  items: t,
  maxVisible: r = 5,
  size: e = 28,
  className: o,
  total: f
}) {
  const s = t ?? (n ?? []).map((i) => ({ name: i })), a = s.slice(0, r), l = (f ?? s.length) - a.length, c = -(e * 0.3);
  return /* @__PURE__ */ m("div", { className: b("inline-flex items-center", o), children: [
    a.map((i, d) => /* @__PURE__ */ h(
      v,
      {
        name: i.name,
        initials: i.initials,
        color: i.color,
        src: i.src,
        size: e,
        className: "border-2 border-white",
        style: { marginLeft: d > 0 ? c : 0 }
      },
      `${i.name}-${d}`
    )),
    l > 0 && /* @__PURE__ */ m(
      "div",
      {
        className: "inline-flex items-center justify-center rounded-full flex-shrink-0 font-semibold select-none bg-slate-200 text-text-secondary border-2 border-white",
        style: {
          width: e,
          height: e,
          fontSize: e * 0.38,
          marginLeft: c
        },
        title: `+${l} more`,
        children: [
          "+",
          l
        ]
      }
    )
  ] });
}
export {
  v as A,
  A as a,
  p as b,
  g as n
};
