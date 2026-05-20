const i = /* @__PURE__ */ new Map();
function u(e) {
  i.set(e.type, e);
}
function g() {
  return Array.from(i.values());
}
function a(e) {
  return i.get(e);
}
const n = /* @__PURE__ */ new Map();
function s(e, r) {
  return `${e}:${r}`;
}
function d(e, r, t) {
  n.set(s(e, r), t);
}
function p(e, r) {
  const t = e ?? "*", c = i.get(t)?.rendererType ?? t;
  return n.get(s(c, r)) ?? n.get(s(c, "*")) ?? n.get(s("*", r)) ?? n.get(s("*", "*")) ?? null;
}
function f() {
  return Array.from(n.entries()).map(([e, r]) => {
    const [t, o] = e.split(":");
    return { sectionType: t, viewMode: o, component: r };
  });
}
export {
  g as a,
  p as b,
  d as c,
  a as g,
  f as l,
  u as r
};
